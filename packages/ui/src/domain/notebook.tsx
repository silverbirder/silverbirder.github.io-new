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
} from "@chakra-ui/react";
import { formatPublishedDate } from "@repo/util";
import { useTranslations } from "next-intl";

import { NotebookProse } from "./notebook-prose";
import { ViewTransitionLink } from "./view-transition-link";

type Props = Omit<ComponentProps<typeof NotebookProse>, "children"> & {
  children?: ReactNode;
  navigation?: {
    next?: {
      href: string;
      publishedAt?: string;
      title: string;
    };
    prev?: {
      href: string;
      publishedAt?: string;
      title: string;
    };
  };
  publishedAt?: string;
  tags?: string[];
  title?: string;
};

export const Notebook = ({
  children,
  navigation,
  publishedAt,
  tags,
  title,
  ...notebookProps
}: Props) => {
  const t = useTranslations("ui.notebook");

  const trimmedTitle = title?.trim();
  const trimmedPublishedAt = publishedAt?.trim();
  const cleanTags = (tags ?? []).map((tag) => tag.trim()).filter(Boolean);

  return (
    <NotebookProse
      borderColor="border.muted"
      borderWidth="1px"
      colorPalette="green"
      w="full"
      {...notebookProps}
    >
      {trimmedTitle && <Heading as="h1">{trimmedTitle}</Heading>}
      {trimmedPublishedAt && (
        <Text as="div" textAlign="right">
          <time dateTime={trimmedPublishedAt}>
            {formatPublishedDate(trimmedPublishedAt)}
          </time>
        </Text>
      )}
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
      {cleanTags.length > 0 && (
        <Stack direction="row">
          {cleanTags.map((tag) => (
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
  );
};
