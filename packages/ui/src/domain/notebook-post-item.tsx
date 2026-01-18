"use client";

import type { ReactNode } from "react";

import { Flex, Stack, Text } from "@chakra-ui/react";

import { Tag } from "./tag";
import { ViewTransitionLink } from "./view-transition-link";

type NotebookPost = {
  publishedAt?: string;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
};

type Props = {
  metaSeparator?: ReactNode;
  post: NotebookPost;
};

export const NotebookPostItem = ({ metaSeparator, post }: Props) => {
  const summary = post.summary;
  const tags = post.tags;
  const showSummary = summary && summary.length > 0;
  const showTags = tags.length > 0;
  const showMetaRow = Boolean(post.publishedAt) || showTags;
  const showMetaSeparator =
    showTags && Boolean(post.publishedAt) && metaSeparator;

  return (
    <Stack
      borderLeftColor="green.border"
      borderLeftWidth="2px"
      gap={0}
      lineHeight="var(--notebook-line-height)"
      pl="calc(var(--notebook-line-height) / 2)"
    >
      <ViewTransitionLink
        href={`/blog/contents/${post.slug}`}
        lineClamp={2}
        lineHeight="var(--notebook-line-height)"
      >
        {post.title}
      </ViewTransitionLink>
      {showSummary ? (
        <Text
          fontSize="sm"
          lineClamp={1}
          lineHeight="var(--notebook-line-height)"
        >
          {summary}
        </Text>
      ) : null}
      {showMetaRow ? (
        <Flex
          align="center"
          columnGap={2}
          lineHeight="var(--notebook-line-height)"
          rowGap={0}
          wrap="wrap"
        >
          {post.publishedAt ? (
            <Text fontSize="sm" whiteSpace="nowrap">
              {post.publishedAt}
            </Text>
          ) : null}
          {showMetaSeparator ? (
            <Text fontSize="sm">{metaSeparator}</Text>
          ) : null}
          {showTags ? tags.map((tag) => <Tag key={tag} tag={tag} />) : null}
        </Flex>
      ) : null}
    </Stack>
  );
};
