import { composeStories } from "@storybook/nextjs-vite";
import { describe, it } from "vitest";

import * as stories from "./oembed-card.stories";

const Stories = composeStories(stories);

describe("OembedCard", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    await Story.run();
  });
});
