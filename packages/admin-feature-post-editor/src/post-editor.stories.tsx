import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import React from "react";

import { PostEditor } from "./post-editor";

const defaultResolvePreview = async (source: string) => ({
  compiledSource: `/*@jsxRuntime automatic @jsxImportSource react*/\nimport { jsx as _jsx } from "react/jsx-runtime";\nexport default function MDXContent(){return _jsx("p", { children: ${JSON.stringify(source || "preview")} });}`,
  frontmatter: {},
  scope: {},
});

type Props = React.ComponentProps<typeof PostEditor>;

type Story = StoryObj<Props>;

const meta = {
  args: {
    resolvePreview: defaultResolvePreview,
  },
  component: PostEditor,
  title: "Feature/Admin/PostEditor",
} satisfies Meta<typeof PostEditor>;

export default meta;

export const Ideal: Story = {};

export const Empty: Story = {};

export const Error: Story = {
  args: {
    resolvePreview: async () => {
      throw new globalThis.Error("Preview failed");
    },
  },
  play: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
  },
};

export const Partial: Story = {};

export const Loading: Story = {
  args: {
    resolvePreview: async () => new Promise(() => undefined),
  },
  play: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
  },
};
