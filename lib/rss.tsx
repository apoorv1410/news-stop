import Parser from "rss-parser";
import { cache } from 'react'
import { summarization } from "@huggingface/inference";

export const revalidate = 60 // revalidate all feed data every minute

export const FEEDS = [
    {
        slug: "inc42-news",
        title: "Inc42 News",
        url: "https://inc42.com/feed/",
        renderContent: true
    },
    {
        slug: "google-news",
        title: "Google News",
        url: "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",
        renderContent: false
    }
];

// function to convert feed heading into valid url
// param: heading (string)
// returns: url (string)
export const convertHeadingToUrl = (heading: string) => {
    // Replace space with '-'
    var url = heading.replace(/ /g, '-').toLowerCase();
    // Remove special characters and convert string to lowercase
    url = url.replace(/[^a-zA-Z0-9-]+/g, '').toLowerCase();
    return url;
}

// function to get word count
// param: text: string
// returns: wordCount (number)
const getWordCount = (text: string) => {
    // remove the extra whitespace
    text = text.trim();

    // split the text from whitespace
    const wordsArray = text.split(/\s+/);

    // get the count of valid words
    const wordCount = wordsArray.filter(word => word !== '').length;

    return wordCount;
}
// function to get all feed data from single feed source
// param: feedUrl: string, feedSlug: string
// returns: feed (object)
export const getFeed = cache(async (feedUrl: string, feedSlug: string) => {
    let parser = new Parser();

    let feed = await parser.parseURL(feedUrl);
    const currentFeed = FEEDS.find(current => current.url === feedUrl)

    // add url to each feed item
    feed.items.forEach(async (item, index) => {
        item.itemURL = '/' + feedSlug + '/' + convertHeadingToUrl((item.title || ''));

        // check if current post item should be processed with huggingface generative AI features.
        // This is to save tokens on limited access plans
        // Conditons:
        // post is being rendered in production environment AND
        // current post item is in top HF_LIMIT count AND
        // current post has more than HF_SUMMARY_MIN_FULL_TEXT_WORD_SIZE content words to be summarized
        const isCurrentItemValidForHF = process.env.NODE_ENV === 'production' && index < (parseInt(process.env.HF_LIMIT!) || 5) && getWordCount(item.content!) > (parseInt(process.env.HF_SUMMARY_MIN_FULL_TEXT_WORD_SIZE!) || 100)
        item.summary = isCurrentItemValidForHF ? await getTextSummary(item.content || ''): '';
    })
    return feed;
})

// function to get all feed posts from all feed sources
// param: none
// returns: urls (array)
export const getAllPosts = cache(async () => {
    let posts: Array<any> = [];

    // loop through each feed source and push each feed post url to urls array
    FEEDS.forEach(async (feed) => {
        const feedData = await getFeed(feed.url, feed.slug);
    
        // add url of each feed item to urls array
        (feedData.items).forEach((item) => {
            posts.push(item);
        })
    })
    return posts;
})

// function to generate text summary from full text by summarization instance
// param: text(string)
// returns: summary_text (string)
const getTextSummary = async (text: string) => {
    // return empty string if text is missing
    if (!text) {
        return ''
    }

    // generate sumary with valid huggingface params from env
    // HF_SUMMARY_MODEL: full name of the huggingface modal being used for summarization. (like 'facebook/bart-large-cnn')
    // HF_ACCESS_TOKEN: access token linked to the hugging face account
    // HF_SUMMARY_MAX_LENGTH: limit to the size of summary text. useful add restriction to tokens used per summary
    const summaryObject = await summarization({
        model: process.env.HF_SUMMARY_MODEL,
        inputs: text,
        accessToken: process.env.HF_ACCESS_TOKEN,
        parameters: {
            max_length: parseInt(process.env.HF_SUMMARY_MAX_LENGTH!)
        }
    })
    return summaryObject.summary_text || ''
}