import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Top } from "./top";

const meta = {
  args: {
    name: "Alice",
    onSignOut: async () => {},
  },
  component: Top,
  title: "Feature/Admin/Top",
} satisfies Meta<typeof Top>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {};

export const Empty: Story = {
  args: {
    name: "",
  },
};

export const Error: Story = {
  args: {
    name: "Failed to load user",
  },
};

export const Partial: Story = {
  args: {
    name: "Signed in",
  },
};

export const Loading: Story = {
  args: {
    name: "Loading...",
  },
};
