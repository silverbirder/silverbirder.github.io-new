import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { PostEditor } from "./post-editor";
import * as stories from "./post-editor.stories";
import { renderWithProvider } from "./test-util";

const Stories = composeStories(stories);

describe("PostEditor", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders labels and placeholders from messages", async () => {
    await renderWithProvider(<PostEditor />);

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
});
