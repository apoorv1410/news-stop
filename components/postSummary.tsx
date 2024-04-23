type Props = {
    summary: string
}

export default function PostSummary({ summary }: Props) {
    return  <div className="bg-yellow-100 p-4 my-2 border border-gray-200 rounded-lg">
                {summary}
            </div>
}
