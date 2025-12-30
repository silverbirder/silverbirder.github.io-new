import { describe, expect, it, vi } from "vitest";

vi.mock("@/libs", () => ({
  getPostSlugs: vi.fn(),
}));

import { getPostSlugs } from "@/libs";

import { generateStaticParams } from "./page";

describe("generateStaticParams", () => {
  it("returns params for each slug", async () => {
    const mockedGetPostSlugs = vi.mocked(getPostSlugs);

    mockedGetPostSlugs.mockResolvedValue([
      { publishedAt: "2025-10-27", slug: "20251027" },
      { publishedAt: "2025-11-01", slug: "20251101" },
    ]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "20251027" }, { slug: "20251101" }]);
    expect(mockedGetPostSlugs).toHaveBeenCalledTimes(1);
  });
});
