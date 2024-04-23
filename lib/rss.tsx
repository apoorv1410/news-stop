import Parser from "rss-parser";
import { cache } from 'react'
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

// function to get all feed data from single feed source
// param: feedUrl: string, feedSlug: string
// returns: feed (object)
export const getFeed = cache(async (feedUrl: string, feedSlug: string) => {
    let parser = new Parser();

    let feed = await parser.parseURL(feedUrl);

    // add url to each feed item
    feed.items.forEach((item) => {
        item.itemURL = '/' + feedSlug + '/' + convertHeadingToUrl((item.title || ''));
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
