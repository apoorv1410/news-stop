import { FEEDS, getFeed } from "../../lib/rss";
import PostCard from "../../components/postCard";
import { notFound } from 'next/navigation'

export const revalidate = 60 // revalidate all feed data every minute

// getStaticPaths is required in dynamic routes in SSG pages to generate them during build time
// get list of feed paths
export const generateStaticParams = async () => {
  return FEEDS.map((post) => ({
    feedSlug: post.slug,
  }))
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

  const feed = FEEDS.find((feed) => feed.slug === params.feedSlug) || { url: '/not-found', slug: '', title: '', renderContent: false};

  // handle invalid feed page
  if (feed.url === '/not-found') {
    return notFound();
  }
  const detailedFeed = await getFeed(feed.url, feed.slug);
  const posts: any = detailedFeed
  return (
    <>
      <div className="px-4 py-1 max-w-2xl mx-auto">
          <h1 className="font-bold text-3xl mb-4">{feed.title}</h1>
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