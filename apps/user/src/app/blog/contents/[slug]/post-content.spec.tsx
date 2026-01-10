import { mdxComponents } from "@repo/ui";
import { MDXClient } from "next-mdx-remote-client";
import { describe, expect, it } from "vitest";

import { PostContent } from "./post-content";

describe("PostContent", () => {
  it("passes compiledSource and components to MDXClient", () => {
    const element = PostContent({ compiledSource: "<p>hello</p>" });

    expect(element.type).toBe(MDXClient);
    expect(element.props.compiledSource).toBe("<p>hello</p>");
    expect(element.props.components).toBe(mdxComponents);
  });
});
