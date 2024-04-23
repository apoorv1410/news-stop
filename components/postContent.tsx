import Head from "next/head";
import Date from './date'

type Props = {
    post: {
        link: string,
        itemURL: string,
        title: string,
        contentSnippet: string,
        isoDate: string,
        creator: string | null,
        content: string,
        'content:encoded': string
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
            <div className="mb-6 text-lg">
                Posted On <Date dateString={post.isoDate} /> | From {post.creator}
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: post['content:encoded'] ? post['content:encoded'] : post.content }}
            />
        </article>
    </>
  );
}