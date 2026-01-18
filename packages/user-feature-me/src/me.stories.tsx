import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Me } from "./me";

const meta = {
  component: Me,
  title: "Feature/User/Me",
} satisfies Meta<typeof Me>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
