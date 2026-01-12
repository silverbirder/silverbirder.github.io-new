import type { Pluggable } from "unified";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { createRemarkOembed } from "./remark-oembed";

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
    createRemarkOembed,
  ],
});
