import { afterEach, describe, expect, it, vi } from "vitest";

const readdir = vi.fn();
const readFile = vi.fn();

vi.mock("node:fs/promises", () => ({
  readdir,
  readFile,
}));

import { getPostSlugs } from ".";

afterEach(() => {
  vi.clearAllMocks();
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
