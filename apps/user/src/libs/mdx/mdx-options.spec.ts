import rehypePrettyCode from "rehype-pretty-code";
import { describe, expect, it } from "vitest";

import { createMdxOptions } from "./mdx-options";

describe("createMdxOptions", () => {
  const isPrettyCodeEntry = (
    plugin: ReturnType<typeof createMdxOptions>["rehypePlugins"][number],
  ): plugin is [
    typeof rehypePrettyCode,
    { keepBackground: boolean; theme: { dark: string; light: string } },
  ] => Array.isArray(plugin) && plugin[0] === rehypePrettyCode;

  it("configures rehype-pretty-code with GitHub themes and no background", () => {
    const options = createMdxOptions();

    const prettyCodeEntry = options.rehypePlugins.find(isPrettyCodeEntry);

    expect(prettyCodeEntry).toBeDefined();
    expect(prettyCodeEntry?.[1]).toEqual(
      expect.objectContaining({
        keepBackground: false,
        theme: { dark: "github-dark", light: "github-light" },
      }),
    );
  });

  it("does not force line numbers", () => {
    const options = createMdxOptions();

    const prettyCodeEntry = options.rehypePlugins.find(isPrettyCodeEntry);
    const prettyCodeOptions = prettyCodeEntry?.[1] as
      | undefined
      | {
          filterMetaString?: (meta?: string) => string;
        };

    expect(prettyCodeOptions?.filterMetaString).toBeUndefined();
  });
});
