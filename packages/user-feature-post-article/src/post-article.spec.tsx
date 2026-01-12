import { Container } from "@chakra-ui/react";
import { Notebook } from "@repo/ui";
import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";

import { PostArticle } from "./post-article";
import * as stories from "./post-article.stories";
import { renderWithProvider } from "./test-util";

const Stories = composeStories(stories);

describe("PostArticle", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("wraps the article with container and notebook prose", () => {
    const element = PostArticle({
      compiledSource: "<p>hello</p>",
      meta: {
        publishedAt: "2025-01-02",
        tags: ["Testing"],
        title: "Test title",
      },
    });

    expect(element.type).toBe(Container);
    expect(element.props.children.type).toBe(Notebook);
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
});
