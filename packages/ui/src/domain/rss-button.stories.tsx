import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RssButton } from "./rss-button";

const meta = {
  component: RssButton,
  title: "UI/Domain/RssButton",
} satisfies Meta<typeof RssButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {
  args: {
    label: "RSSを購読",
    url: "https://example.com/rss.xml",
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
    label: "RSSを購読",
    url: "not-a-url",
  },
};

export const Partial: Story = {
  args: {
    label: "RSSを購読",
    url: "",
  },
};

export const Loading: Story = {
  args: {
    label: "RSSを購読",
    loading: true,
    loadingText: "準備中",
    url: "https://example.com/rss.xml",
  },
};
