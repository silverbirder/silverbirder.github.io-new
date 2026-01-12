import { PostArticle } from "@repo/user-feature-post-article";
import { serialize } from "next-mdx-remote-client/serialize";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { getPostFrontmatter, getPostSlugs } from "@/libs";
import { createMdxOptions } from "@/libs/mdx/mdx-options";

const contentDir = path.resolve(
  process.cwd(),
  "..",
  "..",
  "packages",
  "content",
  "posts",
);

const loadPostSource = async (slug: string) => {
  return readFile(path.join(contentDir, `${slug}.md`), "utf8");
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function Page(props: PageProps<"/blog/contents/[slug]">) {
  const { slug } = await props.params;

  try {
    const frontmatter = await getPostFrontmatter(slug);
    const source = await loadPostSource(slug);
    const compiled = await serialize({
      options: {
        disableExports: true,
        disableImports: true,
        mdxOptions: createMdxOptions(),
      },
      source,
    });
    if (!("compiledSource" in compiled) || !compiled.compiledSource) {
      notFound();
    }

    return (
      <PostArticle
        compiledSource={compiled.compiledSource}
        meta={{
          publishedAt: frontmatter.publishedAt,
          tags: frontmatter.tags,
          title: frontmatter.title,
        }}
      />
    );
  } catch {
    notFound();
  }
}
