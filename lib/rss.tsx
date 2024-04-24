import Parser from "rss-parser";
import { cache } from 'react'
import { summarization, textToSpeech } from "@huggingface/inference";
import { FEEDS } from "./constants";
export const revalidate = 60 // revalidate all feed data every minute

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

    // add url to each feed item
    feed.items.forEach(async (item, index) => {
        item.itemURL = '/' + feedSlug + '/' + convertHeadingToUrl((item.title || ''));
        item.postSlug = convertHeadingToUrl((item.title || ''));
        item.feedSlug = feedSlug;
        item.fullContent = item['content:encoded'] ? item['content:encoded'] : item.content

        // check if current post item should be processed with huggingface summarization feature.
        // This is to save tokens on limited access plans
        // Conditons:
        // post is being rendered in production environment AND
        // current post item is in top HF_LIMIT count AND
        // current post has more than HF_SUMMARY_MIN_FULL_TEXT_WORD_SIZE content words to be summarized
        const isCurrentItemValidForHFSummary = process.env.NODE_ENV === 'production' && index < (parseInt(process.env.HF_LIMIT!) || 5) && getWordCount(item.fullContent) > (parseInt(process.env.HF_SUMMARY_MIN_FULL_TEXT_WORD_SIZE!) || 100)
        item.summary = isCurrentItemValidForHFSummary ? await getTextSummary(item.fullContent || item.content) : '';

        // check if current post item should be processed with huggingface text-to-speech feature.
        // This is to save tokens on limited access plans
        // Conditons:
        // post is being rendered in production environment AND
        // current post item is in top HF_LIMIT count
        const isCurrentItemValidForHFTTS = process.env.NODE_ENV === 'production' && index < (parseInt(process.env.HF_LIMIT!) || 5);
        // To-Do: enable the text-to-speech feature
        // item.audioSource = isCurrentItemValidForHFTTS ? await getTextToSpeech(item.title || '') : '';
    })
    return feed.items;
})

// function to get all feed posts from all feed sources
// param: none
// returns: posts (array)
export const getAllPosts = cache(async () => {
    let posts: Array<any> = [];

    // loop through each feed source and save posts array of each feed in posts
    posts = await Promise.all(FEEDS.map(async (currentFeed) => {
        const currentFeedData = await getFeed(currentFeed.url, currentFeed.slug);
        const feedPosts = currentFeedData.map((feed) => ({ feedSlug: feed.feedSlug || '', postSlug: feed.postSlug || '', summary: feed.summary, index: feed.index}))
        return feedPosts
    }))

    // merge the internal posts arrays from different feeds into single posts array
    posts = posts.flat()
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

// function to convert text to speech
// param: text(string)
// returns: url (string)
export const getTextToSpeech = async (text: string) => {
    // return empty string if text is missing
    if (!text) {
        return ''
    }
    // generate audio from text with valid huggingface params from env
    // HF_TEXT_TO_SPEECH_MODEL: full name of the huggingface modal being used for text-to-speech. (like 'facebook/fastspeech2-en-ljspeech')
    // HF_ACCESS_TOKEN: access token linked to the hugging face account
    const speechResponse = await textToSpeech({
        model: process.env.HF_TEXT_TO_SPEECH_MODEL,
        inputs: text,
        accessToken: process.env.HF_ACCESS_TOKEN
    })

    // convert the speech response into valid audio source url
    const audioUrl = URL.createObjectURL(speechResponse)
    return audioUrl;
}