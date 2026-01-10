import Link from "next/link";

import { getPostFrontmatter, getPostSlugs } from "@/libs";

type PostSummary = {
  publishedAt: string;
  slug: string;
  title: string;
};

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
      return { publishedAt, slug, title } satisfies PostSummary;
    }),
  );

  return posts;
};

export default async function Page() {
  const posts = await getPostList();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/contents/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
