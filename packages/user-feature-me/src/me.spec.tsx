import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { Me } from "./me";
import * as stories from "./me.stories";
import { renderWithProvider } from "./test-util";

const Stories = composeStories(stories);
const followLinks = {
  bluesky: "https://example.com/bluesky",
  github: "https://example.com/github",
  rss: "https://example.com/rss.xml",
  threads: "https://example.com/threads",
  x: "https://example.com/x",
};

describe("Me", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders the profile copy", async () => {
    await renderWithProvider(<Me followLinks={followLinks} />);

    const textContent = document.body.textContent ?? "";
    expect(textContent).toContain(
      "Webのフロントエンド開発とテストが得意なソフトウェアエンジニアです。",
    );
    expect(textContent).toContain(
      "穏やかな風景や音を体験したり、美味しいたべものを共有するのが好きです。",
    );
    expect(textContent).toContain("フォローしてね！");
  });
});
