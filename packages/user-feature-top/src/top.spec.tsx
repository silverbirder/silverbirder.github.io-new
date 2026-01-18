import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { renderWithProvider } from "./test-util";
import { Top } from "./top";
import * as stories from "./top.stories";

const Stories = composeStories(stories);

describe("Top", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders the notebook copy and children", async () => {
    await renderWithProvider(<Top>Child content</Top>);

    const textContent = document.body.textContent ?? "";
    expect(textContent).toContain(
      "ノートブック風のレイアウトを試験的に適用しています。",
    );
    expect(textContent).toContain("このページは準備中です。");
    expect(textContent).toContain("Child content");
  });
});
