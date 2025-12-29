import { readdir } from "node:fs/promises";
import path from "node:path";

const contentDir = path.resolve(
  process.cwd(),
  "..",
  "..",
  "packages",
  "content",
  "posts",
);

export const getPostSlugs = async () => {
  const entries = await readdir(contentDir, { withFileTypes: true } as const);
  const slugs = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
  return Array.from(new Set(slugs));
};
