import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import * as stories from "./tiptap-markdown-editor.stories";

const Stories = composeStories(stories);

describe("TiptapMarkdownEditor", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });
});
