import type { Metadata, MetadataRoute } from "next";

import { buildSitePath, buildSiteUrl, getSiteMetadataBase } from "@repo/util";

export const iconSizes = [32, 48, 72, 96, 144, 192, 512] as const;

export const siteName = "silverbirder";
export const siteShortName = "silverbirder";
export const siteDescription = "@silverbirderのジブンノート";
export const siteCreator = "@silverbirder";
export const siteCategory = "technology";
export const siteKeywords = [
  "silverbirder",
  "個人サイト",
  "ブログ",
  "Webエンジニア",
];
export const siteLocale = "ja_JP";
export const siteThemeColor = "#0f172a";
export const siteBackgroundColor = "#ffffff";
export const siteReferrerPolicy = "origin-when-cross-origin" as const;
export const siteManifestDisplay = "standalone" as const;
export const siteTitleTemplate = `%s | ${siteName}`;

export const createSiteMetadata = (): Metadata => {
  const iconEntries = iconSizes.map((size) => ({
    sizes: `${size}x${size}`,
    url: buildSitePath(`icon/${size}`),
  }));
  const siteUrl = buildSiteUrl("");
  const appleIconPath = buildSitePath("apple-icon");
  const ogImageUrl = buildSiteUrl("opengraph-image");

  return {
    alternates: {
      canonical: siteUrl,
    },
    applicationName: siteName,
    category: siteCategory,
    creator: siteCreator,
    description: siteDescription,
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
    icons: {
      apple: [{ url: appleIconPath }],
      icon: iconEntries,
    },
    keywords: siteKeywords,
    metadataBase: getSiteMetadataBase(),
    openGraph: {
      description: siteDescription,
      images: [
        {
          alt: siteName,
          height: 630,
          url: ogImageUrl,
          width: 1200,
        },
      ],
      locale: siteLocale,
      siteName,
      title: siteName,
      type: "website",
      url: siteUrl,
    },
    publisher: siteName,
    referrer: siteReferrerPolicy,
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
      default: siteName,
      template: siteTitleTemplate,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteCreator,
      description: siteDescription,
      images: [ogImageUrl],
      title: siteName,
    },
  };
};

export const createSiteManifest = (): MetadataRoute.Manifest => ({
  background_color: siteBackgroundColor,
  description: siteDescription,
  display: siteManifestDisplay,
  icons: iconSizes.map((size) => ({
    sizes: `${size}x${size}`,
    src: buildSitePath(`icon/${size}`),
    type: "image/png",
  })),
  name: siteName,
  scope: buildSitePath("/"),
  short_name: siteShortName,
  start_url: buildSitePath("/"),
  theme_color: siteThemeColor,
});
