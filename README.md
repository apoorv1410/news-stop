# NewsStop - Fetch Latest News from Popolur RSS Feeds
- This is a feed reader built with NextJS to fetch the latest news from [Inc42](https://inc42.com/feed/) and [Google News](https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en) feeds
- Live [Demo](https://news-stop-tau.vercel.app/)

## Dependencies:
- `NextJS`: for project base
- `rss-parser`: for parsing the RSS feed
- `tailwind` & `Next-UI` for CSS framework
- `date-fns`: for date-time parsing
- `huggingface/inference`: for AI content generation models

## Setup on Local

Setup the project in `dev` or `production` mode :

```bash
npm run dev
# or
npm run build && npm run start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Overview

- This website fetches the RSS feed and displays beautifully with the help of `Tailwind` and `Next-UI` frameworks
- In addition to feed data, `Text-Summarization` by huggingface models is enabled for longer articles
- `SSG` (Server Side Generation) is enabled for the website performace optimization, so the pages are rendered at build time and served to the client pre-rendered
- Font optimization is done by `next-font` with custom open source Google fonts
- Security headers added in next-config to prevent XSS attacks
- Deployed to [Vercel](https://news-stop-tau.vercel.app/) with env secrets

## Roadmap

- Enable `Text-to-Speech` fetaure with huggingface models
- Add service worker to supprt offline PWA feature