import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostEditor } from "./post-editor";

type Story = StoryObj<typeof PostEditor>;

const meta = {
  component: PostEditor,
  title: "Feature/Admin/PostEditor",
} satisfies Meta<typeof PostEditor>;

export default meta;

export const Ideal: Story = {};

export const Empty: Story = {};

export const Error: Story = {};

export const Partial: Story = {};

export const Loading: Story = {};
