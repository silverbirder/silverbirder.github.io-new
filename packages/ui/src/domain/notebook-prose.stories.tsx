import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NotebookProse } from "./notebook-prose";

const meta = {
  component: NotebookProse,
  title: "UI/Domain/NotebookProse",
} satisfies Meta<typeof NotebookProse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {
  args: {
    children: (
      <>
        <h1>Notebook Layout</h1>
        <p>
          Notes stay aligned to the ruled grid, even when the content stretches
          over multiple lines.
        </p>
        <p>
          Use this style for blog articles to keep the rhythm calm and evenly
          spaced.
        </p>
      </>
    ),
  },
};

export const Empty: Story = {
  render: () => <div />,
};

export const Error: Story = {
  args: {
    children: <p role="alert">We could not load this entry.</p>,
  },
};

export const Partial: Story = {
  args: {
    children: (
      <>
        <h2>Summary</h2>
        <p>Only the key takeaway for now.</p>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    children: <p aria-busy="true">Loading notes...</p>,
  },
};
