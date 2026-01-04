import { TRPCError } from "@trpc/server";
import { Octokit } from "octokit";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { auth } from "@/server/better-auth";

type GitHubContentItem = {
  name: string;
  path: string;
  type: "dir" | "file";
};

const repositoryOwner = "silverbirder";
const repositoryName = "silverbirder.github.io-new";
const postsPath = "packages/content/posts";

export const githubRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: "github",
      },
      headers: ctx.headers,
    });

    if (!accessToken) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const octokit = new Octokit({ auth: accessToken });
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: repositoryOwner,
        path: postsPath,
        repo: repositoryName,
      },
    );

    const data = response.data as GitHubContentItem[];
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter((item) => item.type === "file" && item.name.endsWith(".md"))
      .map((item) => item.name)
      .sort((left, right) => left.localeCompare(right));
  }),
});
