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
import { usePathname } from "next/navigation";

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
  return `${formatted.replaceAll("/", ". ")}`;
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
  const pathname = usePathname();

  const formattedPublishedAt = publishedAt
    ? formatNotebookDate(publishedAt)
    : undefined;
  const postNumberText =
    postNumber !== undefined ? String(postNumber) : undefined;
  const globalNavigationItems = [
    {
      bg: "blue.50",
      href: "/",
      label: t("globalNavigationTop"),
    },
    {
      bg: "yellow.50",
      href: "/me",
      label: t("globalNavigationMe"),
    },
    {
      bg: "pink.50",
      href: "/blog",
      label: t("globalNavigationBlog"),
    },
  ];
  return (
    <VStack
      bg="bg"
      boxShadow="0 -2px 6px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.06)"
      gap="0"
      overflow="visible"
      position="relative"
    >
      <Flex
        aria-label={t("globalNavigationLabel")}
        as="nav"
        gap={2}
        left={0}
        position="absolute"
        top={0}
        zIndex={0}
      >
        {globalNavigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);
          return (
            <ViewTransitionLink
              _hover={{
                height: `calc(${NOTEBOOK_LINE_HEIGHT} + 4px)`,
                textDecoration: "none",
                transform: "translateY(-4px)",
              }}
              bg={item.bg}
              borderRadius="none"
              color="fg.muted"
              h={`calc(${NOTEBOOK_LINE_HEIGHT} * 1)`}
              href={item.href}
              key={item.href}
              minW={`calc(${NOTEBOOK_LINE_HEIGHT} * 3)`}
              position="relative"
              px={2}
              textAlign="center"
              top={isActive ? -4 : `calc(${NOTEBOOK_LINE_HEIGHT} * -1)`}
              transition="transform 160ms ease, height 160ms ease"
              w={`calc(${NOTEBOOK_LINE_HEIGHT} * 3)`}
            >
              {item.label}
            </ViewTransitionLink>
          );
        })}
      </Flex>
      <VStack
        align="flex-start"
        alignSelf="stretch"
        gap="0"
        position="relative"
        pt={NOTEBOOK_LINE_HEIGHT}
        zIndex={1}
      >
        <VStack alignSelf="flex-end" gap="0" minW="12rem">
          <Flex
            align="flex-end"
            borderBottom="1px solid"
            borderColor="border"
            justify="space-between"
            minH={NOTEBOOK_LINE_HEIGHT}
            pr={NOTEBOOK_LINE_HEIGHT}
            w="full"
          >
            <Text as="span" fontSize="xs" lineHeight="1">
              {t("headerNo")}
            </Text>
            <Text as="span" fontSize="sm" lineHeight="1">
              {postNumberText}
            </Text>
          </Flex>
          <Flex
            align="flex-end"
            justify="space-between"
            minH={NOTEBOOK_LINE_HEIGHT}
            pr={NOTEBOOK_LINE_HEIGHT}
            w="full"
          >
            <Text as="span" fontSize="xs" lineHeight="1">
              {t("headerDate")}
            </Text>
            <Text as="span" fontSize="sm" lineHeight="1">
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
        borderTopColor="border"
        borderTopWidth="1px"
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
                    color="green.fg"
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
                    color="green.fg"
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
