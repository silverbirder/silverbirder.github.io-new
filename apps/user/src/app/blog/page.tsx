import { Posts, type PostSummary } from "@repo/user-feature-posts";
import { Suspense } from "react";

import { getPostFrontmatter, getPostSlugs } from "@/libs";

const loadPostFrontmatter = async (slug: string) => {
  return getPostFrontmatter(slug);
};

export const getPostList = async (
  loader: (
    slug: string,
  ) => Promise<Record<string, unknown>> = loadPostFrontmatter,
) => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async ({ publishedAt, slug }) => {
      const frontmatter = await loader(slug);
      const title =
        typeof frontmatter.title === "string" ? frontmatter.title : slug;
      const tags = Array.isArray(frontmatter.tags)
        ? frontmatter.tags.filter(
            (tag): tag is string => typeof tag === "string",
          )
        : [];
      return { publishedAt, slug, tags, title } satisfies PostSummary;
    }),
  );

  return posts;
};

export default async function Page() {
  const posts = await getPostList();

  return (
    <Suspense fallback={null}>
      <Posts posts={posts} />
    </Suspense>
  );
}
