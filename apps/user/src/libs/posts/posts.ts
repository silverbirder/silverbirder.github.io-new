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

export type PostFrontmatter = {
  publishedAt?: string;
  summary?: string;
  title?: string;
};

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

export const getPostFrontmatter = async (
  slug: string,
): Promise<PostFrontmatter> => {
  const content = await readFile(path.join(contentDir, `${slug}.md`), "utf8");
  return {
    publishedAt: extractFrontmatterValue(content, "publishedAt") ?? undefined,
    summary: extractFrontmatterValue(content, "summary") ?? undefined,
    title: extractFrontmatterValue(content, "title") ?? undefined,
  };
};

const extractFrontmatterValue = (content: string, key: string) => {
  const frontmatter = extractFrontmatterBlock(content);
  if (!frontmatter) {
    return null;
  }

  const line = frontmatter
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(`${key}:`));
  if (!line) {
    return null;
  }

  const rawValue = line.replace(new RegExp(`^\\s*${key}:\\s*`), "").trim();
  if (rawValue === "") {
    return null;
  }

  const quote = rawValue.charAt(0);
  if ((quote === "'" || quote === '"') && rawValue.endsWith(quote)) {
    return rawValue.slice(1, -1);
  }

  return rawValue;
};

const extractFrontmatterBlock = (content: string) => {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return null;
  }

  return match[1] ?? null;
};

const extractPublishedAt = (content: string) => {
  return extractFrontmatterValue(content, "publishedAt");
};

const toDateValue = (publishedAt: string) => {
  const dateValue = Date.parse(publishedAt);
  return Number.isNaN(dateValue) ? 0 : dateValue;
};
