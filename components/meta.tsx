import Head from "next/head";
import { DESCRIPTION } from "@/lib/constants";

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/favicon/manifest.json" />
      <link
        rel="mask-icon"
        href="/static/favicon/safari-pinned-tab.svg"
        color="#F3DFC1"
      />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <meta name="msapplication-TileColor" content="#F3DFC1" />
      <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#F3DFC1" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={DESCRIPTION}
      />
    </Head>
  );
}