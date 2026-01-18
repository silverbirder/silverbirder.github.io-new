import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { renderWithProvider } from "../test-util";
import { ShareButtonPocket } from "./share-button-pocket";
import * as stories from "./share-button-pocket.stories";

const Stories = composeStories(stories);

describe("ShareButtonPocket", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("builds share url for Pocket", async () => {
    const url = "https://example.com/blog/contents/test/";
    const text = "Notebook Prose";
    const { container } = await renderWithProvider(
      <ShareButtonPocket label="Pocketに保存" text={text} url={url} />,
    );

    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe(
      `https://getpocket.com/save?url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(text)}`,
    );
  });
});
