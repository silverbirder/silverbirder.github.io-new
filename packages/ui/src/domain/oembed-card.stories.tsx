import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NotebookProse } from "./notebook-prose";
import { OembedCard } from "./oembed-card";

const LINK_PAYLOAD = JSON.stringify({
  description: "リンクプレビューの説明文が入ります。",
  favicon: "https://placehold.co/32x32/png",
  hostname: "example.com",
  image: "https://placehold.co/320x180/png",
  siteName: "Example",
  title: "Example Link Preview",
  type: "link",
  url: "https://example.com",
});

const LINK_PAYLOAD_NO_IMAGE = JSON.stringify({
  hostname: "example.com",
  siteName: "Example",
  title: "Example Link Preview",
  type: "link",
  url: "https://example.com",
});

const OEMBED_PAYLOAD = JSON.stringify({
  html: '<div style="background:#111;color:#fff;padding:16px;border-radius:8px;text-align:center;">oEmbed</div>',
  type: "oembed",
  url: "https://example.com",
});

const meta: Meta<typeof OembedCard> = {
  component: OembedCard,
  decorators: [
    (Story) => (
      <NotebookProse>
        <Story />
      </NotebookProse>
    ),
  ],
  title: "UI/Domain/OembedCard",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Ideal: Story = {
  args: {
    payload: LINK_PAYLOAD,
    url: "https://example.com",
  },
};

export const Empty: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    url: "https://example.com",
  },
};

export const Partial: Story = {
  args: {
    payload: LINK_PAYLOAD_NO_IMAGE,
    url: "https://example.com",
  },
};

export const Loading: Story = {
  args: {
    payload: OEMBED_PAYLOAD,
    url: "https://example.com",
  },
};
