import type { MDXComponents } from "mdx/types";

import { NotebookImage } from "@repo/ui";

const components = {
  img: NotebookImage,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
