import { Octokit } from "octokit";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

type GitHubContentItem = {
  name: string;
  path: string;
  type: "dir" | "file";
};

const repositoryOwner = "silverbirder";
const repositoryName = "silverbirder.github.io-new";
const postsPath = "packages/content/posts";

export const githubRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const octokit = new Octokit();
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
