import { afterEach, describe, expect, it, vi } from "vitest";

const { getPostFrontmatter, getPostSlugs, ImageResponse, notFound, readFile } =
  vi.hoisted(() => ({
    getPostFrontmatter: vi.fn(),
    getPostSlugs: vi.fn(),
    ImageResponse: vi.fn().mockImplementation(function (...args) {
      return { args };
    }),
    notFound: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
    readFile: vi.fn(),
  }));

vi.mock("node:fs/promises", () => ({
  readFile,
}));

vi.mock("next/og", () => ({
  ImageResponse,
}));

vi.mock("next/navigation", () => ({
  notFound,
}));

vi.mock("@/libs", () => ({
  getPostFrontmatter,
  getPostSlugs,
}));

vi.mock("budoux", () => ({
  jaModel: {},
  Parser: class Parser {
    parse(text: string) {
      // Keep it simple/deterministic for tests.
      return [text];
    }
  },
}));

import OpenGraphImage, {
  contentType,
  generateStaticParams,
  size,
} from "./opengraph-image";

afterEach(() => {
  vi.clearAllMocks();
});

describe("blog/contents/[slug]/opengraph-image", () => {
  it("builds a png image response", async () => {
    readFile.mockResolvedValue(Buffer.from([1, 2, 3]));
    getPostFrontmatter.mockResolvedValue({
      title: "OGPのテキストを任意の行で省略する lineClampとbudoux",
    });

    const result = await OpenGraphImage({
      params: Promise.resolve({ slug: "opengraph-image-lineclamp-budoux" }),
    });

    expect(contentType).toBe("image/png");
    expect(size).toEqual({ height: 630, width: 1200 });

    expect(getPostFrontmatter).toHaveBeenCalledTimes(1);
    expect(getPostFrontmatter).toHaveBeenCalledWith(
      "opengraph-image-lineclamp-budoux",
    );

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(String(readFile.mock.calls[0]?.[0])).toContain(
      "/public/assets/logo.png",
    );

    expect(ImageResponse).toHaveBeenCalledWith(expect.anything(), size);
    expect(result).toEqual({ args: [expect.anything(), size] });

    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound when frontmatter lookup fails", async () => {
    readFile.mockResolvedValue(Buffer.from([1, 2, 3]));
    getPostFrontmatter.mockRejectedValue(new Error("missing"));

    await expect(
      OpenGraphImage({
        params: Promise.resolve({ slug: "missing" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalledTimes(1);
    expect(ImageResponse).not.toHaveBeenCalled();
  });

  it("generates static params from slugs", async () => {
    getPostSlugs.mockResolvedValue([{ slug: "a" }, { slug: "b" }]);

    await expect(generateStaticParams()).resolves.toEqual([
      { slug: "a" },
      { slug: "b" },
    ]);

    expect(getPostSlugs).toHaveBeenCalledTimes(1);
  });
});
