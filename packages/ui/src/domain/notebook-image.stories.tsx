import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NotebookImage } from "./notebook-image";

const PLACEHOLDER_SRC = "https://placehold.co/400x400";

const meta = {
  component: NotebookImage,
  title: "UI/Domain/NotebookImage",
} satisfies Meta<typeof NotebookImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdealState: Story = {
  args: {
    alt: "Notebook sample",
    src: PLACEHOLDER_SRC,
  },
};

export const EmptyState: Story = {
  render: () => <div />,
};

export const ErrorState: Story = {
  args: {
    alt: "Missing image",
    src: "",
  },
};

export const PartialState: Story = {
  args: {
    alt: "No src placeholder",
  },
};

export const LoadingState: Story = {
  args: {
    alt: "Lazy image",
    loading: "lazy",
    src: PLACEHOLDER_SRC,
  },
};
