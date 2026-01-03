import { Provider } from "@repo/ui";
import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { NotebookImage } from "./notebook-image";
import * as stories from "./notebook-image.stories";

const Stories = composeStories(stories);

describe("NotebookImage", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders an image with alt text", async () => {
    await render(
      <Provider>
        <NotebookImage alt="Notebook sample" src="/test.png" />
      </Provider>,
    );

    const image = document.querySelector("img");
    expect(image?.getAttribute("alt")).toBe("Notebook sample");
  });
});
