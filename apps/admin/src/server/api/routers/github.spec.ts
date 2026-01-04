import { afterEach, describe, expect, it, vi } from "vitest";

import { createCallerFactory } from "@/server/api/trpc";

vi.mock("@/env", () => ({
  env: { ADMIN_ALLOWED_EMAILS: "allowed@example.com" },
}));

const { getAccessToken } = vi.hoisted(() => ({
  getAccessToken: vi.fn(),
}));

vi.mock("@/server/better-auth", () => ({
  auth: {
    api: {
      getAccessToken,
    },
  },
}));

let requestMock = vi.fn();

vi.mock("octokit", () => ({
  Octokit: class {
    request = (...args: Parameters<typeof requestMock>) => requestMock(...args);
  },
}));

import { githubRouter } from "./github";

const createCaller = createCallerFactory(githubRouter);
const allowedUser = {
  createdAt: new Date(),
  email: "allowed@example.com",
  emailVerified: true,
  id: "user-1",
  name: "Allowed User",
  updatedAt: new Date(),
};
const allowedSession = {
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  id: "session-1",
  token: "session-token",
  updatedAt: new Date(),
  userId: "user-1",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("githubRouter.list", () => {
  it("returns sorted markdown file names", async () => {
    getAccessToken.mockResolvedValue({ accessToken: "test-token" });
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

    const caller = createCaller({
      headers: new Headers(),
      session: { session: allowedSession, user: allowedUser },
    });

    const result = await caller.list();

    expect(result).toEqual(["a.md", "b.md"]);
    expect(requestMock).toHaveBeenCalledOnce();
  });

  it("returns an empty list when response is not an array", async () => {
    getAccessToken.mockResolvedValue({ accessToken: "test-token" });
    requestMock = vi.fn().mockResolvedValue({
      data: { message: "Not found" },
    });

    const caller = createCaller({
      headers: new Headers(),
      session: { session: allowedSession, user: allowedUser },
    });

    const result = await caller.list();

    expect(result).toEqual([]);
  });
});
