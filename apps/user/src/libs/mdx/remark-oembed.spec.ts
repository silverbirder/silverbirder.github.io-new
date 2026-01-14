import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cacheStore = new Map<string, string>();

vi.mock("node:fs/promises", () => {
  return {
    readFile: vi.fn(async (path: string) => {
      const key = String(path);
      if (!cacheStore.has(key)) {
        const error = new Error("ENOENT");
        (error as NodeJS.ErrnoException).code = "ENOENT";
        throw error;
      }
      return cacheStore.get(key);
    }),
    writeFile: vi.fn(async (path: string, content: string) => {
      cacheStore.set(String(path), String(content));
    }),
  };
});

const createParagraph = (value: string, line: number) => ({
  children: [{ type: "text", value }],
  position: { end: { line }, start: { line } },
  type: "paragraph",
});

describe("remark-oembed (user)", () => {
  beforeEach(() => {
    cacheStore.clear();
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({
        description: "description",
        title: "title",
        type: "link",
        url: "https://example.com",
      }),
      ok: true,
    })) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("embeds a plain url with blank lines", async () => {
    const { createRemarkOembed } = await import("./remark-oembed");
    const markdown = "a\n\nhttps://example.com\n\nb";
    const tree = {
      children: [
        createParagraph("a", 1),
        createParagraph("https://example.com", 3),
        createParagraph("b", 5),
      ],
      type: "root",
    };

    const transform = createRemarkOembed();
    await transform(tree, { value: markdown });

    const node = tree.children[1] as {
      attributes?: unknown[];
      name?: string;
      type?: string;
    };
    expect(node.type).toBe("mdxJsxFlowElement");
    expect(node.name).toBe("OembedCard");
    expect(globalThis.fetch).toHaveBeenCalledOnce();
    expect(node.attributes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "url", type: "mdxJsxAttribute" }),
      ]),
    );
  });

  it("skips list links without blank lines", async () => {
    const { createRemarkOembed } = await import("./remark-oembed");
    const markdown = "- https://example.com";
    const tree = {
      children: [
        {
          children: [
            {
              children: [createParagraph("https://example.com", 1)],
              type: "listItem",
            },
          ],
          type: "list",
        },
      ],
      type: "root",
    };

    const transform = createRemarkOembed();
    await transform(tree, { value: markdown });

    const listItem = tree.children?.[0]?.children?.[0];
    const paragraph = listItem?.children?.[0];
    expect(paragraph?.type).toBe("paragraph");
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("skips Twitter/X status links", async () => {
    const { createRemarkOembed } = await import("./remark-oembed");
    const markdown =
      "a\n\nhttps://twitter.com/silverbirder/status/1318861346327252993\n\nb";
    const tree = {
      children: [
        createParagraph("a", 1),
        createParagraph(
          "https://twitter.com/silverbirder/status/1318861346327252993",
          3,
        ),
        createParagraph("b", 5),
      ],
      type: "root",
    };

    const transform = createRemarkOembed();
    await transform(tree, { value: markdown });

    const node = tree.children[1] as { type?: string };
    expect(node.type).toBe("paragraph");
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
