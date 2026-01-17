import { jaMessages } from "@repo/message";
import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { renderWithProvider } from "../test-util";
import * as stories from "./post-layout.stories";

const Stories = composeStories(stories);

describe("PostLayout", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders children and filter links", async () => {
    await renderWithProvider(<Stories.Ideal />);

    expect(document.body.textContent ?? "").toContain("Main");
    expect(document.body.textContent ?? "").toContain(
      jaMessages.user.blog.filtersTitle,
    );
    const blogLinks = Array.from(document.querySelectorAll('a[href^="/blog"]'));
    expect(blogLinks.length).toBeGreaterThan(0);
  });
});
