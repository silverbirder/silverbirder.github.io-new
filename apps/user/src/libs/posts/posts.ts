import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const contentDir = path.resolve(
  process.cwd(),
  "..",
  "..",
  "packages",
  "content",
  "posts",
);

export type PostSlug = {
  publishedAt: string;
  slug: string;
};

export const getPostSlugs = async () => {
  const entries = await readdir(contentDir, { withFileTypes: true } as const);
  const slugs = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const content = await readFile(
        path.join(contentDir, `${slug}.md`),
        "utf8",
      );
      const publishedAt = extractPublishedAt(content);
      if (!publishedAt) {
        return null;
      }

      return { dateValue: toDateValue(publishedAt), publishedAt, slug };
    }),
  );

  return posts
    .filter(
      (
        post,
      ): post is {
        dateValue: number;
        publishedAt: string;
        slug: string;
      } => post !== null,
    )
    .sort((a, b) => b.dateValue - a.dateValue)
    .map(({ publishedAt, slug }) => ({ publishedAt, slug }));
};

const extractPublishedAt = (content: string) => {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return null;
  }

  const frontmatter = match[1];
  if (!frontmatter) {
    return null;
  }

  const line = frontmatter
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith("publishedAt:"));
  if (!line) {
    return null;
  }

  const rawValue = line.replace(/^\s*publishedAt:\s*/, "").trim();
  if (rawValue === "") {
    return null;
  }

  const quote = rawValue.charAt(0);
  if ((quote === "'" || quote === '"') && rawValue.endsWith(quote)) {
    return rawValue.slice(1, -1);
  }

  return rawValue;
};

const toDateValue = (publishedAt: string) => {
  const dateValue = Date.parse(publishedAt);
  return Number.isNaN(dateValue) ? 0 : dateValue;
};
