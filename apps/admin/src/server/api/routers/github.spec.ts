import { afterEach, describe, expect, it, vi } from "vitest";

import { createCallerFactory } from "@/server/api/trpc";

vi.mock("@/env", () => ({
  env: { ADMIN_ALLOWED_EMAILS: "allowed@example.com" },
}));

let requestMock = vi.fn();

vi.mock("octokit", () => ({
  Octokit: class {
    request = (...args: Parameters<typeof requestMock>) => requestMock(...args);
  },
}));

import { githubRouter } from "./github";

const createCaller = createCallerFactory(githubRouter);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("githubRouter.list", () => {
  it("returns sorted markdown file names", async () => {
    requestMock = vi.fn().mockResolvedValue({
      data: [
        { name: "b.md", path: "packages/content/posts/b.md", type: "file" },
        { name: "a.md", path: "packages/content/posts/a.md", type: "file" },
        {
          name: "note.txt",
          path: "packages/content/posts/note.txt",
          type: "file",
        },
        { name: "assets", path: "packages/content/posts/assets", type: "dir" },
      ],
    });

    const caller = createCaller({ headers: new Headers(), session: null });

    const result = await caller.list();

    expect(result).toEqual(["a.md", "b.md"]);
    expect(requestMock).toHaveBeenCalledOnce();
  });

  it("returns an empty list when response is not an array", async () => {
    requestMock = vi.fn().mockResolvedValue({
      data: { message: "Not found" },
    });

    const caller = createCaller({ headers: new Headers(), session: null });

    const result = await caller.list();

    expect(result).toEqual([]);
  });
});
