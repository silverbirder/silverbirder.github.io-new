import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { PostSummary } from "./posts.presenter";

import { Posts } from "./posts";

const basePosts: PostSummary[] = [
  {
    publishedAt: "2026-01-12",
    slug: "hello-world",
    tags: ["TypeScript", "Next.js"],
    title: "Hello World",
  },
  {
    publishedAt: "2025-12-01",
    slug: "second",
    tags: ["Next.js"],
    title: "Second Post",
  },
  {
    publishedAt: "2025-11-01",
    slug: "third",
    tags: [],
    title: "Third Post",
  },
  {
    publishedAt: "2025-10-01",
    slug: "fourth",
    tags: ["TypeScript"],
    title: "Fourth Post",
  },
  {
    publishedAt: "2025-09-01",
    slug: "fifth",
    tags: ["Chakra"],
    title: "Fifth Post",
  },
  {
    publishedAt: "2025-08-01",
    slug: "sixth",
    tags: ["Chakra"],
    title: "Sixth Post",
  },
];

const meta = {
  args: {
    posts: basePosts,
  },
  component: Posts,
  title: "Feature/User/Posts",
} satisfies Meta<typeof Posts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ideal: Story = {};

export const Empty: Story = {
  args: {
    posts: [],
  },
};

export const Partial: Story = {
  args: {
    posts: basePosts.slice(0, 2),
  },
};

export const Loading: Story = {
  args: {
    posts: [],
  },
};

export const Error: Story = {
  args: {
    posts: [],
  },
};
