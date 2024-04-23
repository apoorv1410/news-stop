import { FEEDS, getFeed } from "../../lib/rss";
import PostCard from "../../components/postCard";

export const revalidate = 60 // revalidate all feed data every minute

// get list of paths to be generated during build time
export const generateStaticParams = async () => {
  // set 'fallback: true' to avoid the need to generating all pages at build time...
  // ... and better UX when new page requestedfirst time after build
  return FEEDS
}

type Params = {
    params: {
        feedSlug: string
    }
}

type Item = {
    link: string,
    itemURL: string,
    title: string,
    isoDate: string,
    creator: string | null,
    content: string
}

export default async function Feed ({ params }: Params) {

  const feed = FEEDS.find((feed) => feed.slug === params.feedSlug) || { url: '/', slug: '', title: '', renderContent: false};
  const detailedFeed = await getFeed(feed.url, feed.slug);
  const posts: any = detailedFeed.items
  return (
    <>
      <div className="px-6 py-12 max-w-2xl mx-auto">
          <h1 className="font-bold text-2xl mb-12">{feed.title}</h1>
          <div className="space-y-4">
            {
              posts.map((item: Item, index: number)  => (
                <PostCard
                  post={item}
                  renderContent={feed.renderContent}
                  key={index}
                >
                </PostCard>
              ))
            }
          </div>
      </div>
    </>
  );
}