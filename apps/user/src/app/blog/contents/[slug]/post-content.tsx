"use client";

import { mdxComponents } from "@repo/ui";
import { MDXClient } from "next-mdx-remote-client";

type Props = {
  compiledSource: string;
};

export const PostContent = ({ compiledSource }: Props) => {
  return (
    <MDXClient compiledSource={compiledSource} components={mdxComponents} />
  );
};
