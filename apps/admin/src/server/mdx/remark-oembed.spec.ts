import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createParagraph = (value: string, line: number) => ({
  children: [{ type: "text", value }],
  position: { end: { line }, start: { line } },
  type: "paragraph",
});

describe("remark-oembed (admin)", () => {
  beforeEach(() => {
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

  it("skips link when blank lines are missing", async () => {
    const { createRemarkOembed } = await import("./remark-oembed");
    const markdown = "a\nhttps://example.com\nb";
    const tree = {
      children: [
        createParagraph("a", 1),
        createParagraph("https://example.com", 2),
        createParagraph("b", 3),
      ],
      type: "root",
    };

    const transform = createRemarkOembed();
    await transform(tree, { value: markdown });

    const node = tree.children[1] as { type?: string };
    expect(node.type).toBe("paragraph");
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("skips Twitter/X status links", async () => {
    const { createRemarkOembed } = await import("./remark-oembed");
    const markdown =
      "a\n\nhttps://x.com/silverbirder/status/1318861346327252993\n\nb";
    const tree = {
      children: [
        createParagraph("a", 1),
        createParagraph(
          "https://x.com/silverbirder/status/1318861346327252993",
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
