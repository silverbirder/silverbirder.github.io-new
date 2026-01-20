"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatPublishedDate } from "@repo/util";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { NotebookDash } from "./notebook-dash";
import { NotebookPostItem } from "./notebook-post-item";
import { NOTEBOOK_LINE_HEIGHT, NotebookProse } from "./notebook-prose";
import { ShareButtonBluesky } from "./share-button-bluesky";
import { ShareButtonCopy } from "./share-button-copy";
import { ShareButtonFacebook } from "./share-button-facebook";
import { ShareButtonHatena } from "./share-button-hatena";
import { ShareButtonLine } from "./share-button-line";
import { ShareButtonThreads } from "./share-button-threads";
import { ShareButtonWeb } from "./share-button-web";
import { ShareButtonX } from "./share-button-x";
import { Tag } from "./tag";
import { ViewTransitionLink } from "./view-transition-link";

type FollowItem = {
  active: string;
  bg: string;
  hover: string;
  href: string;
  icon: ReactNode;
  label: string;
};

type FollowSection = {
  heading: string;
  items: FollowItem[];
};

type Props = Omit<ComponentProps<typeof NotebookProse>, "children"> & {
  children: ReactNode;
  follow?: FollowSection;
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
  relatedPosts: RelatedPostGroup[];
  share?: ShareSection;
  tags: string[];
  title: string;
};

type RelatedPost = {
  publishedAt?: string;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
};

type RelatedPostGroup = {
  posts: RelatedPost[];
  tag: string;
};

type ShareLabels = {
  bluesky: string;
  copy: string;
  copyCopied: string;
  facebook: string;
  hatena: string;
  line: string;
  threads: string;
  web: string;
  x: string;
};

type ShareSection = {
  heading: string;
  labels: ShareLabels;
  text: string;
  url: string;
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
  follow,
  navigation,
  postNumber,
  publishedAt,
  relatedPosts,
  share,
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
  const actionButtonSize = "var(--notebook-line-height)";
  const globalNavigationItems = [
    {
      bg: "blue.subtle",
      href: "/",
      label: t("globalNavigationTop"),
    },
    {
      bg: "yellow.subtle",
      href: "/me",
      label: t("globalNavigationMe"),
    },
    {
      bg: "pink.subtle",
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
        zIndex={2}
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
              fontSize="xs"
              h={`calc(${NOTEBOOK_LINE_HEIGHT} * 1)`}
              href={item.href}
              key={item.href}
              position="relative"
              px={2}
              textAlign="center"
              top={isActive ? -4 : `calc(${NOTEBOOK_LINE_HEIGHT} * -1)`}
              transition="transform 160ms ease, height 160ms ease"
              w={`calc(${NOTEBOOK_LINE_HEIGHT} * 2)`}
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
        <Box position="relative" w="full">
          <Heading
            as="h1"
            borderBottomColor="border"
            borderBottomWidth="1px"
            borderTopColor="border"
            borderTopWidth="1px"
            color="fg"
            lineHeight={NOTEBOOK_LINE_HEIGHT}
            p={`calc(${NOTEBOOK_LINE_HEIGHT} / 2)`}
            w="full"
          >
            {title}
          </Heading>
          <NotebookDash height={6} patternWidth={128} />
          <NotebookDash height={3} patternWidth={16} />
        </Box>
      </VStack>
      <NotebookProse colorPalette="green" w="full" {...notebookProps}>
        {children}
        {tags.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={0}
            mb={NOTEBOOK_LINE_HEIGHT}
          >
            {tags.map((tag) => (
              <Tag key={tag} mr={2} tag={tag} />
            ))}
          </Stack>
        )}
        {share && (
          <Box as="section" mb={NOTEBOOK_LINE_HEIGHT}>
            <Heading as="h2">{share.heading}</Heading>
            <Stack align="start" direction="row" flexWrap="wrap">
              <ShareButtonX
                height={actionButtonSize}
                label={share.labels.x}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonBluesky
                height={actionButtonSize}
                label={share.labels.bluesky}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonHatena
                height={actionButtonSize}
                label={share.labels.hatena}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonLine
                height={actionButtonSize}
                label={share.labels.line}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonFacebook
                height={actionButtonSize}
                label={share.labels.facebook}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonThreads
                height={actionButtonSize}
                label={share.labels.threads}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonWeb
                height={actionButtonSize}
                label={share.labels.web}
                text={share.text}
                url={share.url}
                width={actionButtonSize}
              />
              <ShareButtonCopy
                copiedLabel={share.labels.copyCopied}
                height={actionButtonSize}
                label={share.labels.copy}
                url={share.url}
                width={actionButtonSize}
              />
            </Stack>
          </Box>
        )}
        {follow && follow.items.length > 0 && (
          <Box as="section" mb={NOTEBOOK_LINE_HEIGHT}>
            <Heading as="h2">{follow.heading}</Heading>
            <Stack align="start" direction="row" flexWrap="wrap">
              {follow.items.map((item) => (
                <Button
                  _active={{ bg: item.active }}
                  _hover={{ bg: item.hover }}
                  alignItems="center"
                  aria-label={item.label}
                  asChild
                  bg={item.bg}
                  borderRadius="full"
                  color="white"
                  h={actionButtonSize}
                  key={item.label}
                  minW={actionButtonSize}
                  p={0}
                  size="sm"
                  variant="solid"
                  w={actionButtonSize}
                >
                  <a href={item.href} rel="noopener noreferrer" target="_blank">
                    <Icon size="sm">{item.icon}</Icon>
                  </a>
                </Button>
              ))}
            </Stack>
          </Box>
        )}
        {(navigation?.prev || navigation?.next) && (
          <SimpleGrid
            aria-label={t("navigationLabel")}
            as="nav"
            columnGap="0"
            columns={{ base: 1, md: 2 }}
            mb={NOTEBOOK_LINE_HEIGHT}
            rowGap="0"
          >
            {navigation.next && (
              <Flex
                direction="column"
                gridColumn={{ base: "1 / -1", md: "1" }}
                minW={0}
                w="full"
              >
                <Heading as="h2">{t("navigationNext")}</Heading>
                <Box
                  lineHeight="var(--notebook-line-height)"
                  minH={{
                    base: 0,
                    md: "calc(var(--notebook-line-height) * 2)",
                  }}
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
                <Heading as="h2">{t("navigationPrev")}</Heading>
                <Box
                  lineHeight="var(--notebook-line-height)"
                  minH={{
                    base: 0,
                    md: "calc(var(--notebook-line-height) * 2)",
                  }}
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
        {relatedPosts.length > 0 && (
          <Box as="section" mb={NOTEBOOK_LINE_HEIGHT}>
            <Heading as="h2">{t("relatedHeading")}</Heading>
            <Stack gap={NOTEBOOK_LINE_HEIGHT}>
              {relatedPosts.map((group) => (
                <Stack
                  as="section"
                  className="not-prose"
                  gap={NOTEBOOK_LINE_HEIGHT}
                  key={group.tag}
                >
                  <Text
                    color="fg"
                    fontWeight="bold"
                    lineHeight={NOTEBOOK_LINE_HEIGHT}
                  >
                    {t("relatedTagHeading", { tag: group.tag })}
                  </Text>
                  <Stack gap={NOTEBOOK_LINE_HEIGHT}>
                    {group.posts.map((post) => (
                      <NotebookPostItem
                        key={`${group.tag}-${post.slug}`}
                        post={post}
                      />
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </NotebookProse>
    </VStack>
  );
};
