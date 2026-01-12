"use client";

import type { ComponentProps, ReactNode } from "react";

import { Badge, Heading, Stack } from "@chakra-ui/react";
import { formatPublishedDate } from "@repo/util";

import { NotebookProse } from "./notebook-prose";

type Props = Omit<ComponentProps<typeof NotebookProse>, "children"> & {
  children?: ReactNode;
  publishedAt?: string;
  tags?: string[];
  title?: string;
};

export const Notebook = ({
  children,
  publishedAt,
  tags,
  title,
  ...notebookProps
}: Props) => {
  const trimmedTitle = title?.trim();
  const trimmedPublishedAt = publishedAt?.trim();
  const cleanTags = (tags ?? []).map((tag) => tag.trim()).filter(Boolean);

  return (
    <NotebookProse
      borderColor="border.muted"
      borderWidth="1px"
      px="2"
      w="full"
      {...notebookProps}
    >
      {trimmedTitle && <Heading as="h1">{trimmedTitle}</Heading>}
      {trimmedPublishedAt && (
        <time dateTime={trimmedPublishedAt}>
          {formatPublishedDate(trimmedPublishedAt)}
        </time>
      )}
      {cleanTags.length > 0 && (
        <Stack direction="row">
          {cleanTags.map((tag) => (
            <Badge
              height="var(--notebook-line-height)"
              key={tag}
              size="sm"
              variant="surface"
            >
              {tag}
            </Badge>
          ))}
        </Stack>
      )}
      {children}
    </NotebookProse>
  );
};
