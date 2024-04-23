import { parseISO, format } from "date-fns";

type Props = {
    dateString: string;
}

export default function Date({ dateString }: Props) {
  try {
    const date = parseISO(dateString);
    // format the date like 'April 22, 2024'
    const formattedDate = format(date, "LLLL d, yyyy");
    // use the 'time' tag with 'dateTime' attribute for better SEO and reminder features
    return (
      <time dateTime={dateString}>{formattedDate}</time>
    )
    } catch (error: any) {
        console.error("Error parsing date:", error.message);
        return <></>;
    }
}
