import type { Pluggable } from "unified";

import { createRemarkLinkCardGuard } from "@repo/util";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkLinkCardPlus from "remark-link-card-plus";
import remarkMdx from "remark-mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

type MdxOptions = {
  rehypePlugins: Pluggable[];
  remarkPlugins: Pluggable[];
};

export const createMdxOptions = (): MdxOptions => ({
  rehypePlugins: [
    [
      rehypeRaw,
      {
        passThrough: ["mdxjsEsm", "mdxJsxFlowElement", "mdxJsxTextElement"],
      },
    ],
    [
      rehypePrettyCode,
      {
        keepBackground: false,
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
      },
    ],
  ],
  remarkPlugins: [
    remarkFrontmatter,
    remarkMdx,
    remarkMdxFrontmatter,
    remarkGfm,
    createRemarkLinkCardGuard,
    [
      remarkLinkCardPlus,
      { cache: false, noThumbnail: false, shortenUrl: true },
    ],
  ],
});
