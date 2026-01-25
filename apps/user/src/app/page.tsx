import type { Metadata } from "next";

import { siteName } from "@repo/metadata";
import { Top } from "@repo/user-feature-top";
import { buildSiteUrl } from "@repo/util";

const title = "ホーム";
const description =
  "silverbirder のホームページ。ノートブック風レイアウトでプロフィールやブログへの導線をまとめています。";
const canonical = buildSiteUrl("");
const ogImageUrl = buildSiteUrl("opengraph-image");

export const metadata: Metadata = {
  alternates: {
    canonical,
  },
  description,
  keywords: [siteName, "ホーム", "個人サイト", "ブログ", "プロフィール"],
  openGraph: {
    description,
    images: [
      {
        alt: siteName,
        height: 630,
        url: ogImageUrl,
        width: 1200,
      },
    ],
    siteName,
    title,
    type: "website",
    url: canonical,
  },
  title,
  twitter: {
    description,
    images: [ogImageUrl],
    title,
  },
};

export default function Page() {
  return <Top />;
}
