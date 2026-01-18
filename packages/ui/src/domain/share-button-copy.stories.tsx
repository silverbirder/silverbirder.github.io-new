import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShareButtonCopy } from "./share-button-copy";

const meta = {
  component: ShareButtonCopy,
  title: "UI/Domain/ShareButtonCopy",
} satisfies Meta<typeof ShareButtonCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {
  args: {
    label: "リンクをコピー",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};

export const Empty: Story = {
  args: {
    label: "",
    url: "",
  },
  render: () => <div />,
};

export const Error: Story = {
  args: {
    label: "リンクをコピー",
    url: "not-a-url",
  },
};

export const Partial: Story = {
  args: {
    label: "リンクをコピー",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};

export const Loading: Story = {
  args: {
    label: "リンクをコピー",
    loading: true,
    loadingText: "準備中",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};
