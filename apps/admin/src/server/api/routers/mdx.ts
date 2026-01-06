import { serialize } from "next-mdx-remote-client/serialize";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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
        },
        source: input.source,
      });
    }),
});
