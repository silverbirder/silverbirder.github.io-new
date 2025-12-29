import { describe, expect, it, vi } from "vitest";

vi.mock("@/libs", () => ({
  getPostSlugs: vi.fn(),
}));

import { getPostSlugs } from "@/libs";

import { getPostList } from "./page";

describe("getPostList", () => {
  it("returns titles with publishedAt and sorts by publishedAt in descending order", async () => {
    const mockedGetPostSlugs = vi.mocked(getPostSlugs);
    const loader = vi.fn();

    mockedGetPostSlugs.mockResolvedValue(["first", "second", "third"]);
    loader
      .mockResolvedValueOnce({
        publishedAt: "2020-01-01",
        title: "Old title",
      })
      .mockResolvedValueOnce({
        publishedAt: "2021-01-01",
        title: "New title",
      })
      .mockResolvedValueOnce({});

    const posts = await getPostList(loader);

    expect(posts).toEqual([
      { publishedAt: "2021-01-01", slug: "second", title: "New title" },
      { publishedAt: "2020-01-01", slug: "first", title: "Old title" },
    ]);
    expect(mockedGetPostSlugs).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenNthCalledWith(1, "first");
    expect(loader).toHaveBeenNthCalledWith(2, "second");
    expect(loader).toHaveBeenNthCalledWith(3, "third");
  });
});
