import { describe, expect, it } from "vitest";

import {
  filterPosts,
  getAvailableTags,
  getAvailableYears,
  paginatePosts,
  type PostSummary,
} from "./posts.presenter";

const basePosts: PostSummary[] = [
  {
    publishedAt: "2026-01-12",
    slug: "a",
    summary: "Summary A",
    tags: ["Next.js"],
    title: "A",
  },
  {
    publishedAt: "2025-12-01",
    slug: "b",
    summary: "Summary B",
    tags: ["TypeScript", "Next.js"],
    title: "B",
  },
  {
    publishedAt: "2025-11-01",
    slug: "c",
    summary: "Summary C",
    tags: [],
    title: "C",
  },
  {
    publishedAt: "2025-10-01",
    slug: "d",
    summary: "Summary D",
    tags: ["TypeScript"],
    title: "D",
  },
  {
    publishedAt: "2025-09-01",
    slug: "e",
    summary: "Summary E",
    tags: ["Chakra"],
    title: "E",
  },
  {
    publishedAt: "2025-08-01",
    slug: "f",
    summary: "Summary F",
    tags: ["Chakra"],
    title: "F",
  },
];

describe("posts presenter", () => {
  it("getAvailableYears returns unique years desc", () => {
    expect(getAvailableYears(basePosts)).toEqual(["2026", "2025"]);
  });

  it("getAvailableTags returns unique tags", () => {
    expect(getAvailableTags(basePosts)).toEqual([
      "Chakra",
      "Next.js",
      "TypeScript",
    ]);
  });

  it("filterPosts filters by year", () => {
    expect(
      filterPosts(basePosts, { tag: null, year: "2026" }).map((p) => p.slug),
    ).toEqual(["a"]);
  });

  it("filterPosts filters by tag", () => {
    expect(
      filterPosts(basePosts, { tag: "Chakra", year: null }).map((p) => p.slug),
    ).toEqual(["e", "f"]);
  });

  it("paginatePosts uses page size 5", () => {
    const page1 = paginatePosts(basePosts, 1);
    const page2 = paginatePosts(basePosts, 2);

    expect(page1.totalPages).toBe(2);
    expect(page1.items).toHaveLength(5);
    expect(page2.items).toHaveLength(1);
  });
});
