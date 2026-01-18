import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it, vi } from "vitest";

import { renderWithProvider } from "../test-util";
import { Notebook } from "./notebook";
import * as stories from "./notebook.stories";

vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/",
  };
});

const Stories = composeStories(stories);

describe("Notebook", () => {
  it.each(Object.entries(Stories))("should render %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders title, date, and tags", async () => {
    const { container } = await renderWithProvider(
      <Notebook
        navigation={{}}
        postNumber={1}
        publishedAt="2025-01-02"
        tags={["Chakra", "Design"]}
        title="Notebook Preview"
      >
        <p>Body copy.</p>
      </Notebook>,
    );

    const heading = container.querySelector("h1");
    const time = container.querySelector("time");

    expect(heading?.textContent ?? "").toBe("Notebook Preview");
    expect(time?.textContent ?? "").toBe("2025. 01. 02");
    expect(container.textContent ?? "").toContain("NO");
    expect(container.textContent ?? "").toContain("Chakra");
    expect(container.textContent ?? "").toContain("Design");
  });

  it("renders previous/next navigation when provided", async () => {
    const { container } = await renderWithProvider(
      <Notebook
        navigation={{
          next: {
            href: "/blog/contents/next",
            publishedAt: "2025-01-03",
            title: "Next",
          },
          prev: {
            href: "/blog/contents/prev",
            publishedAt: "2025-01-01",
            title: "Prev",
          },
        }}
        tags={[]}
        title="Notebook Preview"
      >
        <p>Body copy.</p>
      </Notebook>,
    );

    const nav = container.querySelector('nav[aria-label="記事ナビゲーション"]');
    expect(nav).not.toBeNull();

    const links = Array.from(
      container.querySelectorAll('a[href^="/blog/contents/"]'),
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/blog/contents/next/",
      "/blog/contents/prev/",
    ]);
  });

  it("renders global navigation sticky tabs", async () => {
    const { container } = await renderWithProvider(
      <Notebook
        navigation={{}}
        postNumber={1}
        publishedAt="2025-01-02"
        tags={[]}
        title="Notebook Preview"
      >
        <p>Body copy.</p>
      </Notebook>,
    );

    const nav = container.querySelector(
      'nav[aria-label="グローバルナビゲーション"]',
    );
    expect(nav).not.toBeNull();

    const labels = Array.from(nav?.querySelectorAll("a") ?? []).map(
      (link) => link.textContent,
    );
    expect(labels).toEqual(["トップ", "自己紹介", "ブログ"]);
  });
});
