export const NAME = "NewsStop";
export const DESCRIPTION = "Your one stop for news around the world 🌎";
export const LATEST_POSTS_LIMIT = 7
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