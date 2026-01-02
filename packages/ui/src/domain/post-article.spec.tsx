import { Provider } from "@repo/ui";
import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { PostArticle } from "./post-article";
import * as stories from "./post-article.stories";

const Stories = composeStories(stories);

describe("PostArticle", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders provided content", async () => {
    await render(
      <Provider>
        <PostArticle>
          <h1>Designing Better Notes</h1>
        </PostArticle>
      </Provider>,
    );

    const heading = document.querySelector("h1");
    expect(heading?.textContent ?? "").toContain("Designing Better Notes");
  });
});
