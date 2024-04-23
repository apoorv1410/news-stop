import { getAllPosts, FEEDS, getFeed } from '../../../lib/rss'
import PostContent from "../../../components/postContent";
import PostCard from "../../../components/postCard";

export const revalidate = 60 // revalidate all feed data every minute

// getStaticPaths is required in dynamic routes in SSG pages to generate them during build time
export const generateStaticParams = async () => {
  const posts = await getAllPosts();

  return posts;
};

type Params = {
    params: {
        feedSlug: string,
        postSlug: string
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

export default async function Post ({ params }: Params) {
    const feed = FEEDS.find((feed) => feed.slug === params.feedSlug) || { url: '/', slug: '', title: '', renderContent: false};
    const detailedFeed = await getFeed(feed.url, feed.slug);
    const fullSlug = "/" + params.feedSlug + "/" + params.postSlug;
    const currentPost: any = detailedFeed.items.find(item => item.itemURL === fullSlug);
    const otherPostsFromSameFeed: any = detailedFeed.items.filter((item) => item.itemURL !== fullSlug) || [];

  return (
      <div className="max-w-2xl mx-auto px-4">
          <PostContent post={currentPost}></PostContent>
          <div className="text-2xl font-bold">More from {feed.title}</div>
          {
              otherPostsFromSameFeed.map((post: Item, index: number) => {
                  return <PostCard
                            post={post}
                            renderContent={feed.renderContent}
                            key={index}
                          >
                          </PostCard>
              })
          }
      </div>
  )
}