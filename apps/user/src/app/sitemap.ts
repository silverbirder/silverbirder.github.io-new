import type { MetadataRoute } from "next";

import { buildSiteUrl, getPostSlugs } from "@/libs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();
  const uniqueSlugs = Array.from(new Set(slugs)).sort();

  return [
    { url: buildSiteUrl("") },
    { url: buildSiteUrl("blog/") },
    ...uniqueSlugs.map((slug) => ({
      url: buildSiteUrl(`blog/contents/${slug}/`),
    })),
  ];
}
