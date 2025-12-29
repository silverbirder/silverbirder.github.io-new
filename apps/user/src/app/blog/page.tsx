import Link from "next/link";

import { getPostSlugs } from "@/libs";

type PostSummary = {
  publishedAt: string;
  slug: string;
  title: string;
};

const loadPostFrontmatter = async (slug: string) => {
  const { frontmatter } = await import(`@repo/content/posts/${slug}.md`);
  return frontmatter;
};

const toDateValue = (publishedAt: string) => {
  const dateValue = Date.parse(publishedAt);
  return Number.isNaN(dateValue) ? 0 : dateValue;
};

export const getPostList = async (
  loader: (
    slug: string,
  ) => Promise<Record<string, unknown>> = loadPostFrontmatter,
) => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const frontmatter = await loader(slug);
      const title =
        typeof frontmatter.title === "string" ? frontmatter.title : slug;
      const publishedAt =
        typeof frontmatter.publishedAt === "string"
          ? frontmatter.publishedAt
          : "";

      return { publishedAt, slug, title } satisfies PostSummary;
    }),
  );

  return posts
    .filter((post) => post.publishedAt !== "")
    .sort((a, b) => toDateValue(b.publishedAt) - toDateValue(a.publishedAt));
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
