import type { ComponentPropsWithoutRef, ComponentType } from "react";

import { describe, expect, it } from "vitest";

import { renderWithProvider } from "../test-util";
import { mdxComponents } from "./mdx-components";
import { NotebookImage } from "./notebook-image";

describe("mdxComponents", () => {
  it("does not wrap NotebookImage with a <p>", async () => {
    const P = mdxComponents.p as unknown as ComponentType<
      ComponentPropsWithoutRef<"p">
    >;

    const { container } = await renderWithProvider(
      <P>
        <NotebookImage alt="Notebook sample" src="/test.png" />
      </P>,
    );

    expect(container.querySelector("p")).toBeNull();
    expect(container.querySelector("figure")).not.toBeNull();
  });

  it("does not wrap linked NotebookImage with a <p>", async () => {
    const P = mdxComponents.p as unknown as ComponentType<
      ComponentPropsWithoutRef<"p">
    >;
    const A = mdxComponents.a as unknown as ComponentType<
      ComponentPropsWithoutRef<"a">
    >;

    const { container } = await renderWithProvider(
      <P>
        <A href="https://example.com">
          <NotebookImage alt="Notebook sample" src="/test.png" />
        </A>
      </P>,
    );

    expect(container.querySelector("p")).toBeNull();
    expect(container.querySelector("figure")).not.toBeNull();

    const links = Array.from(container.querySelectorAll("a"));
    expect(links).toHaveLength(1);
    expect(links[0]?.getAttribute("href")).toBe("https://example.com");
    expect(links[0]?.getAttribute("target")).toBe("_blank");
  });
});
