'use client'
import Link from "next/link";
import Date from './date'
import { useState } from "react";

type Props = {
    post: {
        link: string,
        itemURL: string,
        title: string,
        isoDate: string,
        creator: string | null,
        content: string
    },
    renderContent: boolean
}

export const PostCard = ({ post, renderContent }: Props) => {
    const [clicked, setClicked] = useState(false);
    return <Link
                key={post.link}
                className={`bg-yellow-100 block my-4 p-4 border border-gray-200 hover:border-gray-500 rounded-lg cursor-pointer ${
                    clicked ? 'opacity-50' : 'hover:opacity-80'
                  }`}
                href={post.itemURL}
                onClick={() => setClicked(!clicked)}
            >
                <h1 aria-label={post.title} className="text-xl font-bold p-0">{post.title}</h1>
                <div className="text-sm">
                    Posted On <Date dateString={post.isoDate} />
                </div>
                {/* render the content if renderContent flag is true */}
                {renderContent && <div dangerouslySetInnerHTML={{ __html: post.content}}></div>}
        </Link>;
}

export default PostCard
