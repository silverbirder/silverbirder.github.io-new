import { Top } from "@repo/user-feature-top";
import { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@repo/util", async () => {
  const actual =
    await vi.importActual<typeof import("@repo/util")>("@repo/util");
  return {
    ...actual,
    buildSiteUrl: vi.fn((pathname: string) => `url:${pathname}`),
  };
});

import Page, { metadata } from "./page";

describe("Page", () => {
  it("renders the top feature entry", () => {
    const element = Page();

    expect(isValidElement(element)).toBe(true);
    expect(element.type).toBe(Top);
  });

  it("defines metadata for the top page", () => {
    expect(metadata.title).toBe("トップ");
    expect(metadata.description).toBe(
      "silverbirder のトップページ。ノートブック風レイアウトでプロフィールやブログへの導線をまとめています。",
    );
    expect(metadata.alternates?.canonical).toBe("url:");
    expect(metadata.openGraph).toMatchObject({
      title: "トップ",
      type: "website",
      url: "url:",
    });
    expect(metadata.twitter).toMatchObject({
      title: "トップ",
    });
  });
});
