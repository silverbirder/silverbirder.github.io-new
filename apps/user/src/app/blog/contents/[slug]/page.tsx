import { PostArticle } from "@repo/user-feature-post-article";
import { normalizePosts } from "@repo/user-feature-posts";
import { serialize } from "next-mdx-remote-client/serialize";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  getAdjacentPosts,
  getPostFrontmatter,
  getPostList,
  getRelatedPostsByTags,
} from "@/libs";
import { createMdxOptions } from "@/libs/mdx/mdx-options";

export { generateStaticParams } from "./static-params";

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

export default async function Page(props: PageProps<"/blog/contents/[slug]">) {
  const { slug } = await props.params;

  try {
    const frontmatter = await getPostFrontmatter(slug);
    const postList = await getPostList();
    const normalizedPosts = normalizePosts(postList);
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

    const { nextPost, prevPost } = getAdjacentPosts(normalizedPosts, slug);
    const relatedPosts = getRelatedPostsByTags(normalizedPosts, {
      slug,
      tags: frontmatter.tags,
    });

    return (
      <PostArticle
        compiledSource={compiled.compiledSource}
        meta={{
          publishedAt: frontmatter.publishedAt ?? "",
          tags: frontmatter.tags ?? [],
          title: frontmatter.title ?? "",
        }}
        navigation={{
          next: nextPost
            ? {
                href: `/blog/contents/${nextPost.slug}`,
                publishedAt: nextPost.publishedAt ?? "",
                title: nextPost.title,
              }
            : undefined,
          prev: prevPost
            ? {
                href: `/blog/contents/${prevPost.slug}`,
                publishedAt: prevPost.publishedAt ?? "",
                title: prevPost.title,
              }
            : undefined,
        }}
        relatedPosts={relatedPosts ?? []}
      />
    );
  } catch {
    notFound();
  }
}
