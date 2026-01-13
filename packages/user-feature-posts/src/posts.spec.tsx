import type { AnchorHTMLAttributes, ReactNode } from "react";

import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it, vi } from "vitest";

import type { PostSummary } from "./posts.presenter";

import { Posts } from "./posts";
import * as stories from "./posts.stories";
import { renderWithProvider } from "./test-util";

type NextLinkMockProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  href?: unknown;
};

vi.mock("next/link", () => {
  const Link = ({ children, href, ...props }: NextLinkMockProps) => {
    const resolvedHref =
      typeof href === "string" ? href : href ? String(href) : "";
    return (
      <a href={resolvedHref ?? ""} {...props}>
        {children}
      </a>
    );
  };

  return { __esModule: true, default: Link };
});

let mockedSearchParams = "";

vi.mock("next/navigation", () => {
  return {
    useSearchParams: () => new URLSearchParams(mockedSearchParams),
  };
});

const Stories = composeStories(stories);

const createPosts = (): PostSummary[] => [
  {
    publishedAt: "2026-01-12",
    slug: "a",
    tags: ["TypeScript"],
    title: "A",
  },
  {
    publishedAt: "2026-01-11",
    slug: "b",
    tags: [],
    title: "B",
  },
  {
    publishedAt: "2026-01-10",
    slug: "c",
    tags: [],
    title: "C",
  },
  {
    publishedAt: "2026-01-09",
    slug: "d",
    tags: [],
    title: "D",
  },
  {
    publishedAt: "2026-01-08",
    slug: "e",
    tags: [],
    title: "E",
  },
  {
    publishedAt: "2026-01-07",
    slug: "f",
    tags: [],
    title: "F",
  },
];

describe("Posts", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();
    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders 5 posts per page in descending order", async () => {
    mockedSearchParams = "";
    await renderWithProvider(<Posts posts={[...createPosts()]} />);

    const links = Array.from(
      document.querySelectorAll('a[href^="/blog/contents/"]'),
    );

    expect(links).toHaveLength(5);
    expect(links.map((a) => a.textContent)).toEqual(["A", "B", "C", "D", "E"]);
    expect(document.body.textContent ?? "").not.toContain("F");
  });

  it("renders page 2 items and pagination hrefs", async () => {
    mockedSearchParams = "page=2";
    await renderWithProvider(<Posts posts={[...createPosts()]} />);

    const links = Array.from(
      document.querySelectorAll('a[href^="/blog/contents/"]'),
    );
    expect(links).toHaveLength(1);
    expect(links[0]?.textContent ?? "").toBe("F");

    const prev = Array.from(document.querySelectorAll("a")).find(
      (a) => a.textContent === "前へ",
    );
    const next = Array.from(document.querySelectorAll("a")).find(
      (a) => a.textContent === "次へ",
    );
    const page1 = Array.from(document.querySelectorAll("a")).find(
      (a) => a.textContent === "1",
    );

    expect(prev?.getAttribute("href") ?? "").toBe("/blog");
    expect(page1?.getAttribute("href") ?? "").toBe("/blog");
    expect(next?.getAttribute("href") ?? "").toBe("/blog?page=3");
  });
});
