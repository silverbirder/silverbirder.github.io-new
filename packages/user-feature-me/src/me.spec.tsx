import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { Me } from "./me";
import * as stories from "./me.stories";
import { renderWithProvider } from "./test-util";

const Stories = composeStories(stories);

describe("Me", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders the notebook copy and children", async () => {
    await renderWithProvider(<Me>Child content</Me>);

    const textContent = document.body.textContent ?? "";
    expect(textContent).toContain(
      "プロフィールや活動内容をまとめる予定のページです。",
    );
    expect(textContent).toContain("内容は後日追加します。");
    expect(textContent).toContain("Child content");
  });
});
