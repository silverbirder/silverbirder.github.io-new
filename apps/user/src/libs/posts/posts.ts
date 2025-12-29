import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const contentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../app/blog/contents/[slug]",
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
