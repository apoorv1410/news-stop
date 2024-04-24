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
        summary: string,
        audioSource: string
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

            <h1 aria-label={post.title} className="font-bold p-0">
                {post.title}
            </h1>
            <h2 className="mb-6 font-normal text-base">
                Posted On <Date dateString={post.isoDate} /> {post.creator && `| From ${post.creator}`}
            </h2>
            {post.audioSource && <audio src={post.audioSource} id="speech" controls />}
            {post.summary && <PostSummary summary={post.summary}></PostSummary>}
            <div
                dangerouslySetInnerHTML={{ __html: post['content:encoded'] ? post['content:encoded'] : post.content }}
            />
        </article>
    </>
  );
}