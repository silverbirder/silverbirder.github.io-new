import { describe, expect, it, vi } from "vitest";

vi.mock("@/libs", () => ({
  getPostSlugs: vi.fn(),
}));

import { getPostSlugs } from "@/libs";

import { getPostList } from "./page";

describe("getPostList", () => {
  it("returns titles with publishedAt in the slug order", async () => {
    const mockedGetPostSlugs = vi.mocked(getPostSlugs);
    const loader = vi.fn();

    mockedGetPostSlugs.mockResolvedValue([
      { publishedAt: "2020-01-01", slug: "first" },
      { publishedAt: "2021-01-01", slug: "second" },
    ]);
    loader
      .mockResolvedValueOnce({
        publishedAt: "2020-01-01",
        title: "Old title",
      })
      .mockResolvedValueOnce({
        publishedAt: "2021-01-01",
        title: "New title",
      });

    const posts = await getPostList(loader);

    expect(posts).toEqual([
      {
        publishedAt: "2020-01-01",
        slug: "first",
        tags: [],
        title: "Old title",
      },
      {
        publishedAt: "2021-01-01",
        slug: "second",
        tags: [],
        title: "New title",
      },
    ]);
    expect(mockedGetPostSlugs).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenNthCalledWith(1, "first");
    expect(loader).toHaveBeenNthCalledWith(2, "second");
  });
});
