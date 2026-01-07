import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it, vi } from "vitest";

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

  it("renders the editor and markdown textarea", async () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });

    await renderWithProvider(<PostEditor />);

    const editorTextbox = document.querySelector("[role='textbox']");
    const markdownTextarea = document.querySelector("textarea[readonly]");

    expect(editorTextbox).not.toBeNull();
    expect(markdownTextarea).not.toBeNull();
  });
});
