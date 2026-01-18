import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { renderWithProvider } from "../test-util";
import { Tag } from "./tag";
import * as stories from "./tag.stories";

const Stories = composeStories(stories);

describe("Tag", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("links to the tag filtered blog page", async () => {
    const tag = "Design System";
    const { container } = await renderWithProvider(<Tag tag={tag} />);

    const link = container.querySelector("a");
    expect(link?.textContent ?? "").toContain(tag);
    expect(link?.getAttribute("href") ?? "").toContain(
      `/blog/?tag=${encodeURIComponent(tag)}`,
    );
  });
});
