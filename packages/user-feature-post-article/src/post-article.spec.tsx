import { Container } from "@chakra-ui/react";
import { MdxClientWrapper, NotebookProse } from "@repo/ui";
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

  it("wraps compiled source with container, notebook prose, and mdx wrapper", () => {
    const element = PostArticle({ compiledSource: "<p>hello</p>" });

    expect(element.type).toBe(Container);
    expect(element.props.children.type).toBe(NotebookProse);
    expect(element.props.children.props.children.type).toBe(MdxClientWrapper);
    expect(element.props.children.props.children.props.compiledSource).toBe(
      "<p>hello</p>",
    );
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

    await renderWithProvider(<PostArticle compiledSource={compiledSource} />);

    const paragraph = document.querySelector("p");
    expect(paragraph?.textContent ?? "").toContain("Body copy.");
  });
});
