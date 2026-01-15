import type { AnchorHTMLAttributes, ReactNode } from "react";

import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it, vi } from "vitest";

import { PostArticle } from "./post-article";
import * as stories from "./post-article.stories";
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

const Stories = composeStories(stories);

describe("PostArticle", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("wraps the article with post layout and notebook prose", () => {
    const compiledSource = `"use strict";
const {jsx: _jsx} = arguments[0];
function MDXContent() {
  return _jsx("p", {
    children: "hello"
  });
}
return {
  default: MDXContent
};
`;

    renderWithProvider(
      <PostArticle
        compiledSource={compiledSource}
        filters={{
          availableTags: ["Testing"],
          availableYears: ["2025"],
        }}
        meta={{
          publishedAt: "2025-01-02",
          tags: ["Testing"],
          title: "Test title",
        }}
      />,
    );

    expect(document.querySelector("nav")).not.toBeNull();
    expect(document.body.textContent ?? "").toContain("絞り込み");
    expect(document.body.textContent ?? "").toContain("Test title");
  });

  it("renders compiled source via provider wrapper", async () => {
    const compiledSource = `"use strict";
const {jsx: _jsx} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  return _jsx("p", {
    children: "Body copy."
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ..._provideComponents(),
    ...props.components
  };
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
return {
  default: MDXContent
};
`;

    await renderWithProvider(
      <PostArticle
        compiledSource={compiledSource}
        filters={{
          availableTags: ["Testing"],
          availableYears: ["2025"],
        }}
        meta={{
          publishedAt: "2025-01-02",
          tags: ["Testing"],
          title: "Test title",
        }}
      />,
    );

    const paragraph = document.querySelector("p");
    expect(paragraph?.textContent ?? "").toContain("Body copy.");
  });

  it("renders the published date and tags", async () => {
    const compiledSource = `"use strict";
const {jsx: _jsx} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  return _jsx("p", {
    children: "Body copy."
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ..._provideComponents(),
    ...props.components
  };
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
return {
  default: MDXContent
};
`;

    await renderWithProvider(
      <PostArticle
        compiledSource={compiledSource}
        filters={{
          availableTags: ["Chakra", "Design"],
          availableYears: ["2025"],
        }}
        meta={{
          publishedAt: "2025-01-02",
          tags: ["Chakra", "Design"],
          title: "Test title",
        }}
      />,
    );

    const timeElement = document.querySelector("time");
    expect(timeElement?.textContent ?? "").toBe("2025/01/02");
    expect(document.body.textContent ?? "").toContain("Chakra");
    expect(document.body.textContent ?? "").toContain("Design");
  });

  it("renders related posts grouped by tag", () => {
    const compiledSource = `"use strict";
const {jsx: _jsx} = arguments[0];
function MDXContent() {
  return _jsx("p", {
    children: "hello"
  });
}
return {
  default: MDXContent
};
`;

    renderWithProvider(
      <PostArticle
        compiledSource={compiledSource}
        filters={{
          availableTags: ["TypeScript", "Design"],
          availableYears: ["2025"],
        }}
        meta={{
          title: "Test title",
        }}
        relatedPosts={[
          {
            posts: [
              {
                publishedAt: "2025-01-03",
                slug: "typescript-post",
                title: "TypeScript Post",
              },
            ],
            tag: "TypeScript",
          },
        ]}
      />,
    );

    expect(document.body.textContent ?? "").toContain("関連する記事");
    expect(document.body.textContent ?? "").toContain(
      "タグ「TypeScript」の新着",
    );
    expect(document.body.textContent ?? "").toContain("TypeScript Post");
  });

  it("renders previous/next navigation when provided", () => {
    const compiledSource = `"use strict";
const {jsx: _jsx} = arguments[0];
function MDXContent() {
  return _jsx("p", {
    children: "hello"
  });
}
return {
  default: MDXContent
};
`;

    renderWithProvider(
      <PostArticle
        compiledSource={compiledSource}
        filters={{
          availableTags: [],
          availableYears: [],
        }}
        meta={{
          title: "Test title",
        }}
        navigation={{
          next: { href: "/blog/contents/next", title: "Next" },
          prev: { href: "/blog/contents/prev", title: "Prev" },
        }}
      />,
    );

    const nav = document.querySelector('nav[aria-label="記事ナビゲーション"]');
    expect(nav).not.toBeNull();
    expect(document.body.textContent ?? "").toContain("前のページ");
    expect(document.body.textContent ?? "").toContain("次のページ");
  });
});
