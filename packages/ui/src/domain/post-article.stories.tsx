import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostArticle } from "./post-article";

const meta = {
  component: PostArticle,
  title: "UI/Domain/PostArticle",
} satisfies Meta<typeof PostArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdealState: Story = {
  args: {
    children: (
      <>
        <h1>Designing Better Notes</h1>
        <p>
          A short guide to building a note-taking workflow that feels light but
          still captures the details that matter.
        </p>
        <ul>
          <li>Start with a single sentence summary.</li>
          <li>Collect highlights as you read.</li>
          <li>Close with one concrete next action.</li>
        </ul>
      </>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    children: null,
  },
};

export const ErrorState: Story = {
  args: {
    children: (
      <p role="alert">We could not load this article. Please try again.</p>
    ),
  },
};

export const PartialState: Story = {
  args: {
    children: (
      <>
        <h2>Summary</h2>
        <p>Just the key takeaway for now.</p>
      </>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    children: <p aria-busy="true">Loading content...</p>,
  },
};
