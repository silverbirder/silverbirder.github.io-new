import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Sans_JP } from "next/font/google";

import { buildSitePath, buildSiteUrl, getSiteMetadataBase } from "@/libs";

const iconSizes = [32, 48, 72, 96, 144, 192, 512];
const iconEntries = iconSizes.map((size) => ({
  sizes: `${size}x${size}`,
  url: buildSitePath(`icon/${size}`),
}));
const siteUrl = buildSiteUrl("");
const appleIconPath = buildSitePath("apple-icon");
const ogImageUrl = buildSiteUrl("opengraph-image");

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  applicationName: "silverbirder",
  category: "technology",
  creator: "@silverbirder",
  description: "@silverbirderのジブンノート",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    apple: [{ url: appleIconPath }],
    icon: iconEntries,
  },
  keywords: ["silverbirder", "個人サイト", "ブログ", "Webエンジニア"],
  metadataBase: getSiteMetadataBase(),
  openGraph: {
    description: "@silverbirderのジブンノート",
    images: [
      {
        alt: "silverbirder",
        height: 630,
        url: ogImageUrl,
        width: 1200,
      },
    ],
    locale: "ja_JP",
    siteName: "silverbirder",
    title: "silverbirder",
    type: "website",
    url: siteUrl,
  },
  publisher: "silverbirder",
  referrer: "origin-when-cross-origin",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "silverbirder",
    template: "%s | silverbirder",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@silverbirder",
    description: "@silverbirderのジブンノート",
    images: [ogImageUrl],
    title: "silverbirder",
  },
};

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
