"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatPublishedDate } from "@repo/util";
import { useTranslations } from "next-intl";

import { NOTEBOOK_LINE_HEIGHT, NotebookProse } from "./notebook-prose";
import { ViewTransitionLink } from "./view-transition-link";

type Props = Omit<ComponentProps<typeof NotebookProse>, "children"> & {
  children: ReactNode;
  navigation: {
    next?: {
      href: string;
      publishedAt: string;
      title: string;
    };
    prev?: {
      href: string;
      publishedAt: string;
      title: string;
    };
  };
  postNumber?: number;
  publishedAt?: string;
  tags: string[];
  title: string;
};

const formatNotebookDate = (value: string) => {
  const formatted = formatPublishedDate(value);
  if (formatted === value) {
    return value;
  }
  return `${formatted.replaceAll("/", ". ")}.`;
};

export const Notebook = ({
  children,
  navigation,
  postNumber,
  publishedAt,
  tags,
  title,
  ...notebookProps
}: Props) => {
  const t = useTranslations("ui.notebook");

  const formattedPublishedAt = publishedAt
    ? formatNotebookDate(publishedAt)
    : undefined;
  const postNumberText =
    postNumber !== undefined ? String(postNumber) : undefined;
  return (
    <VStack bg="bg" gap="0">
      <VStack
        align="flex-start"
        alignSelf="stretch"
        gap="0"
        lineHeight={NOTEBOOK_LINE_HEIGHT}
        pt={NOTEBOOK_LINE_HEIGHT}
      >
        <VStack alignSelf="flex-end" gap="0" minW="12rem">
          <Flex
            align="baseline"
            borderBottom="1px solid"
            borderColor="border"
            justify="space-between"
            pr={NOTEBOOK_LINE_HEIGHT}
            w="full"
          >
            <Text as="span" fontSize="xs">
              {t("headerNo")}
            </Text>
            <Text as="span" color="fg" fontSize="sm" fontWeight="semibold">
              {postNumberText}
            </Text>
          </Flex>
          <Flex
            align="baseline"
            justify="space-between"
            pr={NOTEBOOK_LINE_HEIGHT}
            w="full"
          >
            <Text as="span" fontSize="xs">
              {t("headerDate")}
            </Text>
            <Text as="span" color="fg" fontSize="sm" fontWeight="semibold">
              <time dateTime={publishedAt}>{formattedPublishedAt}</time>
            </Text>
          </Flex>
        </VStack>
        <Heading
          as="h1"
          borderTopColor="border"
          borderTopWidth="1px"
          color="fg"
          lineClamp={2}
          lineHeight={NOTEBOOK_LINE_HEIGHT}
          p={`calc(${NOTEBOOK_LINE_HEIGHT} / 2)`}
          w="full"
        >
          {title}
        </Heading>
      </VStack>
      <NotebookProse
        borderColor="border.muted"
        borderWidth="1px"
        colorPalette="green"
        w="full"
        {...notebookProps}
      >
        {children}
        {(navigation?.prev || navigation?.next) && (
          <SimpleGrid
            aria-label={t("navigationLabel")}
            as="nav"
            columnGap="var(--notebook-line-height)"
            columns={{ base: 1, md: 2 }}
            rowGap="var(--notebook-line-height)"
          >
            {navigation.next && (
              <Flex
                direction="column"
                gridColumn={{ base: "1 / -1", md: "1" }}
                minW={0}
                w="full"
              >
                <Text
                  as="div"
                  color="fg.muted"
                  fontSize="sm"
                  lineHeight="var(--notebook-line-height)"
                  m={0}
                  minH="var(--notebook-line-height)"
                >
                  {t("navigationNext")}
                </Text>
                <Box
                  lineHeight="var(--notebook-line-height)"
                  minH="calc(var(--notebook-line-height) * 2)"
                  mt={0}
                >
                  <ViewTransitionLink
                    _hover={{ color: "green.emphasized" }}
                    color="green.fg"
                    display="block"
                    fontWeight="semibold"
                    href={navigation.next.href}
                    lineClamp={2}
                    lineHeight="var(--notebook-line-height)"
                  >
                    {navigation.next.title}
                  </ViewTransitionLink>
                </Box>
              </Flex>
            )}
            {navigation.prev && (
              <Flex
                direction="column"
                gridColumn={{ base: "1 / -1", md: "2" }}
                minW={0}
                w="full"
              >
                <Text
                  as="div"
                  color="fg.muted"
                  fontSize="sm"
                  lineHeight="var(--notebook-line-height)"
                  m={0}
                  minH="var(--notebook-line-height)"
                >
                  {t("navigationPrev")}
                </Text>
                <Box
                  lineHeight="var(--notebook-line-height)"
                  minH="calc(var(--notebook-line-height) * 2)"
                  mt={0}
                >
                  <ViewTransitionLink
                    _hover={{ color: "green.emphasized" }}
                    color="green.fg"
                    display="block"
                    fontWeight="semibold"
                    href={navigation.prev.href}
                    lineClamp={2}
                    lineHeight="var(--notebook-line-height)"
                  >
                    {navigation.prev.title}
                  </ViewTransitionLink>
                </Box>
              </Flex>
            )}
          </SimpleGrid>
        )}
        {tags.length > 0 && (
          <Stack direction="row">
            {tags.map((tag) => (
              <Badge
                colorPalette="green"
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
      </NotebookProse>
    </VStack>
  );
};
