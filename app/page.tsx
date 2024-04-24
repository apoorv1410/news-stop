import { FEEDS } from "../lib/rss";
import Link from "next/link";
import "../styles/globals.css";

export const revalidate = 60 // revalidate all feed data every minute

export default function NewsStop () {
  return (
    <div>
        <div className="px-4 py-1 max-w-2xl mx-auto">
            <h1 className="font-bold text-5xl mb-12">News Stop</h1>
            <h1 className="text-2xl mb-12">Your one stop for news around the world 🌎</h1>
            <div className="grid grid-cols-2 gap-4">
                {
                    FEEDS.map((feed) => (
                    <Link key={feed.slug} href={`/${feed.slug}`} className="bg-yellow-100 p-4 border border-gray-200 hover:border-gray-500 rounded-lg">
                        {feed.title}
                    </Link>
                    ))
                }
            </div>
        </div>
    </div>
  );
}