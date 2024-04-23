import Head from "next/head";
import Date from './date'
import PostSummary from "./postSummary";

type Props = {
    post: {
        link: string,
        itemURL: string,
        title: string,
        contentSnippet: string,
        isoDate: string,
        creator: string | null,
        content: string,
        'content:encoded': string,
        summary: string
    }
}

export default function PostContent({ post }: Props) {

  return (
    <>
        <article>
            <Head>
                <title>
                    {post.title}
                </title>
                <meta
                    name="description"
                    content={post.contentSnippet}
                />
            </Head>

            <div className="text-3xl font-bold">
                {post.title}
            </div>
            <div className="mb-6 text-base">
                Posted On <Date dateString={post.isoDate} /> {post.creator && `| From ${post.creator}`}
            </div>
            {post.summary && <PostSummary summary={post.summary}></PostSummary>}
            <div
                dangerouslySetInnerHTML={{ __html: post['content:encoded'] ? post['content:encoded'] : post.content }}
            />
        </article>
    </>
  );
}