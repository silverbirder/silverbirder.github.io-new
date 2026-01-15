import type { PostSummary } from "@repo/user-feature-posts";

import { afterEach, describe, expect, it, vi } from "vitest";

import { getAdjacentPosts, getPostFrontmatter, getPostSlugs } from ".";

const { readdir, readFile } = vi.hoisted(() => ({
  readdir: vi.fn(),
  readFile: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  readdir,
  readFile,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("getAdjacentPosts", () => {
  const posts: PostSummary[] = [
    {
      publishedAt: "2026-01-12",
      slug: "first",
      tags: [],
      title: "First",
    },
    {
      publishedAt: "2026-01-11",
      slug: "second",
      tags: [],
      title: "Second",
    },
    {
      publishedAt: "2026-01-10",
      slug: "third",
      tags: [],
      title: "Third",
    },
  ];

  it("returns previous and next posts when slug is in the middle", () => {
    const result = getAdjacentPosts(posts, "second");

    expect(result.prevPost?.slug).toBe("first");
    expect(result.nextPost?.slug).toBe("third");
  });

  it("returns null for prevPost when slug is the first", () => {
    const result = getAdjacentPosts(posts, "first");

    expect(result.prevPost).toBeNull();
    expect(result.nextPost?.slug).toBe("second");
  });

  it("returns null for nextPost when slug is the last", () => {
    const result = getAdjacentPosts(posts, "third");

    expect(result.prevPost?.slug).toBe("second");
    expect(result.nextPost).toBeNull();
  });

  it("returns nulls when slug does not exist", () => {
    const result = getAdjacentPosts(posts, "missing");

    expect(result.prevPost).toBeNull();
    expect(result.nextPost).toBeNull();
  });
});

describe("getPostSlugs", () => {
  it("returns slugs sorted by publishedAt and excludes entries without publishedAt", async () => {
    readdir.mockResolvedValue([
      { isFile: () => true, name: "first.md" },
      { isFile: () => true, name: "second.md" },
      { isFile: () => true, name: "draft.md" },
      { isFile: () => true, name: "notes.txt" },
    ]);
    readFile.mockImplementation((filePath: string) => {
      if (filePath.endsWith("first.md")) {
        return `---
title: 'First'
publishedAt: '2020-01-01'
---`;
      }
      if (filePath.endsWith("second.md")) {
        return `---
title: 'Second'
publishedAt: '2021-01-01'
---`;
      }
      if (filePath.endsWith("draft.md")) {
        return `---
title: 'Draft'
---`;
      }
      return "";
    });

    const slugs = await getPostSlugs();

    expect(slugs).toEqual([
      { publishedAt: "2021-01-01", slug: "second" },
      { publishedAt: "2020-01-01", slug: "first" },
    ]);
    expect(readdir).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledTimes(3);
  });
});

describe("getPostFrontmatter", () => {
  it("returns frontmatter with parsed tags", async () => {
    readFile.mockResolvedValue(`---
title: "Tagged post"
publishedAt: "2025-01-01"
summary: "Summary"
tags: [nextjs, mdx]
---`);

    const frontmatter = await getPostFrontmatter("example");

    expect(frontmatter).toEqual({
      publishedAt: "2025-01-01",
      summary: "Summary",
      tags: ["nextjs", "mdx"],
      title: "Tagged post",
    });
    expect(readFile).toHaveBeenCalledTimes(1);
  });

  it("returns undefined tags when frontmatter omits tags", async () => {
    readFile.mockResolvedValue(`---
title: "No tags"
publishedAt: "2025-01-02"
---`);

    const frontmatter = await getPostFrontmatter("example");

    expect(frontmatter.tags).toBeUndefined();
  });
});
