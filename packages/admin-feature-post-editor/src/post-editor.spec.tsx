import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it, vi } from "vitest";

import { PostEditor } from "./post-editor";
import * as stories from "./post-editor.stories";
import { renderWithProvider } from "./test-util";

const Stories = composeStories(stories);

describe("PostEditor", () => {
  const resolvePreview = async (source: string) => ({
    compiledSource: `/*@jsxRuntime automatic @jsxImportSource react*/\nimport { jsx as _jsx } from "react/jsx-runtime";\nexport default function MDXContent(){return _jsx("p", { children: ${JSON.stringify(source)} });}`,
    frontmatter: {},
    scope: {},
  });

  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders labels and placeholders from messages", async () => {
    await renderWithProvider(<PostEditor resolvePreview={resolvePreview} />);

    const title = document.querySelector("h1");
    const labels = Array.from(document.querySelectorAll("label")).map(
      (label) => label.textContent ?? "",
    );
    const titleInput = document.querySelector("input[name='title']");
    const bodyInput = document.querySelector("textarea[name='body']");
    const preview = document.querySelector(
      "[data-testid='post-editor-preview']",
    );

    expect(title?.textContent ?? "").toContain("ブログ");
    expect(labels.some((label) => label.includes("タイトル"))).toBe(true);
    expect(labels.some((label) => label.includes("本文"))).toBe(true);
    expect(titleInput?.getAttribute("placeholder") ?? "").not.toBe("");
    expect(bodyInput?.getAttribute("placeholder") ?? "").not.toBe("");
    expect(preview?.textContent ?? "").toContain("プレビュー");
  });

  it("keeps body focused while preview loads", async () => {
    vi.useFakeTimers();

    try {
      await renderWithProvider(
        <PostEditor resolvePreview={() => new Promise(() => undefined)} />,
      );

      const bodyInput = document.querySelector(
        "textarea[name='body']",
      ) as HTMLTextAreaElement | null;

      bodyInput?.focus();
      if (bodyInput) {
        bodyInput.value = "Hello";
        bodyInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      await vi.advanceTimersByTimeAsync(400);

      expect(document.activeElement).toBe(bodyInput);
    } finally {
      vi.useRealTimers();
    }
  });
});
