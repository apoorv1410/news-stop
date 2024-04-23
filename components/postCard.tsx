import Link from "next/link";
import Date from './date'

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

export default function Container({ post, renderContent }: Props) {
    return <Link
                key={post.link}
                className={`bg-yellow-100 block my-4 p-4 border border-gray-200 hover:border-gray-500 rounded-lg cursor-pointer`}
                href={post.itemURL}
            >
                <div className="font-bold text-xl">{post.title}</div>
                <div className="text-sm">
                    Posted On <Date dateString={post.isoDate} />
                </div>
                {/* render the content if renderContent flag is true */}
                {renderContent && <div dangerouslySetInnerHTML={{ __html: post.content}}></div>}
        </Link>;
}