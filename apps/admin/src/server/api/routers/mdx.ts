import { serialize } from "next-mdx-remote-client/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createRemarkOembed } from "@/server/mdx/remark-oembed";

export const mdxRouter = createTRPCRouter({
  preview: protectedProcedure
    .input(
      z.object({
        source: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return serialize({
        options: {
          disableExports: true,
          disableImports: true,
          mdxOptions: {
            rehypePlugins: [
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
            remarkPlugins: [remarkGfm, remarkMdx, createRemarkOembed],
          },
        },
        source: input.source,
      });
    }),
});
