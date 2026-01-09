import { afterEach, describe, expect, it, vi } from "vitest";

const { getLinkPreview } = vi.hoisted(() => ({
  getLinkPreview: vi.fn(),
}));

vi.mock("link-preview-js", () => ({
  getLinkPreview,
}));

const loadAction = async () => {
  vi.resetModules();
  const mod = await import("./resolve-link-titles");
  return {
    resolveLinkTitles: mod.resolveLinkTitles,
  };
};

describe("resolveLinkTitles", () => {
  afterEach(() => {
    getLinkPreview.mockReset();
  });

  it("returns markdown with updated link text", async () => {
    getLinkPreview.mockResolvedValue({
      title: "Example Page",
    });

    const { resolveLinkTitles } = await loadAction();

    const result = await resolveLinkTitles("See [link](https://example.com).");

    expect(getLinkPreview).toHaveBeenCalledWith("https://example.com", {
      followRedirects: "follow",
      headers: {
        "user-agent": "AdminLinkResolver/1.0",
      },
      timeout: 4000,
    });
    expect(result).toContain("Example Page - example.com");
  });
});
