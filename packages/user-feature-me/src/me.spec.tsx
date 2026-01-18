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

  it("renders provided children", async () => {
    await renderWithProvider(<Me>Child content</Me>);

    const element = document.querySelector("div");
    expect(element).not.toBeNull();
    expect(element?.textContent ?? "").toContain("Child content");
  });
});
