import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Box, Heading, Text } from "@chakra-ui/react";

import { PostLayout } from "./post-layout";

const meta = {
  component: PostLayout,
  title: "Domain/PostLayout",
} satisfies Meta<typeof PostLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs: Story["args"] = {
  breadcrumb: [{ label: "Blog" }],
  children: (
    <Box>
      <Heading as="h2" size="md">
        Main
      </Heading>
      <Text>Content goes here.</Text>
    </Box>
  ),
  header: (
    <Heading as="h1" mb={6} size="lg">
      Blog
    </Heading>
  ),
  sidebar: {
    availableTags: ["TypeScript", "Next.js"],
    availableYears: ["2026", "2025"],
    buildHref: ({ page, tag, year }) => {
      const params = new URLSearchParams();
      if (year) params.set("year", year);
      if (tag) params.set("tag", tag);
      if (page && page > 1) params.set("page", String(page));
      const query = params.toString();
      return query ? `/blog?${query}` : "/blog";
    },
    labels: {
      filtersAll: "All",
      filtersTag: "Tag",
      filtersTitle: "Filters",
      filtersYear: "Year",
    },
    selectedTag: null,
    selectedYear: null,
  },
};

export const Ideal: Story = {
  args: baseArgs,
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    sidebar: {
      ...baseArgs.sidebar!,
      availableTags: [],
      availableYears: [],
    },
  },
};

export const Error: Story = {
  args: {
    ...baseArgs,
    children: (
      <Box>
        <Heading as="h2" size="md">
          Main
        </Heading>
        <Text color="fg.muted">Failed to load.</Text>
      </Box>
    ),
  },
};

export const Partial: Story = {
  args: {
    ...baseArgs,
    sidebar: {
      ...baseArgs.sidebar!,
      availableTags: ["Next.js"],
      availableYears: [],
      selectedTag: "Next.js",
    },
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    children: (
      <Box aria-busy>
        <Heading as="h2" size="md">
          Main
        </Heading>
        <Text>Loading…</Text>
      </Box>
    ),
  },
};
