import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShareButtonPocket } from "./share-button-pocket";

const meta = {
  component: ShareButtonPocket,
  title: "UI/Domain/ShareButtonPocket",
} satisfies Meta<typeof ShareButtonPocket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {
  args: {
    label: "Pocketに保存",
    text: "Notebook Prose",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};

export const Empty: Story = {
  args: {
    label: "",
    text: "",
    url: "",
  },
  render: () => <div />,
};

export const Error: Story = {
  args: {
    label: "Pocketに保存",
    text: "Broken URL",
    url: "not-a-url",
  },
};

export const Partial: Story = {
  args: {
    label: "Pocketに保存",
    text: "",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};

export const Loading: Story = {
  args: {
    label: "Pocketに保存",
    loading: true,
    loadingText: "準備中",
    text: "Notebook Prose",
    url: "https://example.com/blog/contents/notebook-prose/",
  },
};
