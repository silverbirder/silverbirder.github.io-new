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

  it("wraps compiled source with notebook prose and mdx wrapper", () => {
    const element = PostArticle({ compiledSource: "<p>hello</p>" });

    expect(element.type).toBe(NotebookProse);
    expect(element.props.children.type).toBe(MdxClientWrapper);
    expect(element.props.children.props.compiledSource).toBe("<p>hello</p>");
  });

  it("renders compiled source via provider wrapper", async () => {
    const compiledSource = `"use strict";
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    p: "p",
    ..._provideComponents(),
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h1, {
      children: "Hello"
    }), "\\n", _jsx(_components.p, {
      children: "This is a test."
    })]
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

    const heading = document.querySelector("h1");
    expect(heading?.textContent ?? "").toContain("Hello");
  });
});
