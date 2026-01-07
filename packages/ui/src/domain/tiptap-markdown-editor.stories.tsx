import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useState } from "react";

import { TiptapMarkdownEditor } from "./tiptap-markdown-editor";

const meta = {
  component: TiptapMarkdownEditor,
  title: "UI/Domain/TiptapMarkdownEditor",
} satisfies Meta<typeof TiptapMarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = () => {
  const [value, setValue] = useState(
    "# Hello\n\nWrite **markdown** here.\n\n- One\n- Two\n",
  );

  return <TiptapMarkdownEditor onChange={setValue} value={value} />;
};

const EmptyTemplate = () => {
  const [value, setValue] = useState("");
  return <TiptapMarkdownEditor onChange={setValue} value={value} />;
};

const LoadingTemplate = () => {
  const [value, setValue] = useState("# Disabled\n\nCannot edit");
  return <TiptapMarkdownEditor isDisabled onChange={setValue} value={value} />;
};

const PartialTemplate = () => {
  const [value, setValue] = useState("# Draft");
  return <TiptapMarkdownEditor onChange={setValue} value={value} />;
};

const ErrorTemplate = () => {
  const [value, setValue] = useState("# Error state\n\n(Not applicable)");
  return <TiptapMarkdownEditor onChange={setValue} value={value} />;
};

export const Ideal: Story = {
  args: {
    onChange: () => {},
    value: "",
  },
  render: () => <Template />,
};

export const Empty: Story = {
  args: {
    onChange: () => {},
    value: "",
  },
  render: () => <EmptyTemplate />,
};

export const Loading: Story = {
  args: {
    isDisabled: true,
    onChange: () => {},
    value: "",
  },
  render: () => <LoadingTemplate />,
};

export const Partial: Story = {
  args: {
    onChange: () => {},
    value: "",
  },
  render: () => <PartialTemplate />,
};

export const Error: Story = {
  args: {
    onChange: () => {},
    value: "",
  },
  render: () => <ErrorTemplate />,
};
