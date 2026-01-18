"use client";

import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Notebook, ViewTransitionLink } from "@repo/ui";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  filterPosts,
  getPaginationItems,
  normalizePosts,
  paginatePosts,
  type PostSummary,
} from "./posts.presenter";

const ELLIPSIS = "…";

type Props = {
  posts: PostSummary[];
};

export const Posts = ({ posts }: Props) => {
  const searchParams = useSearchParams();

  const selectedYear = searchParams.get("year") ?? null;
  const selectedTag = searchParams.get("tag") ?? null;
  const pageParam = searchParams.get("page");
  const parsedPage = pageParam ? Number(pageParam) : 1;
  const urlCurrentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const currentPage = urlCurrentPage;

  const t = useTranslations("user.blog");
  const normalizedPosts = normalizePosts(posts);
  const filteredPosts = filterPosts(normalizedPosts, {
    tag: selectedTag,
    year: selectedYear,
  });
  const pagination = paginatePosts(filteredPosts, currentPage);
  const paginationItems = getPaginationItems(
    pagination.currentPage,
    pagination.totalPages,
  );

  const buildHref = (input: {
    page?: null | number;
    tag?: null | string;
    year?: null | string;
  }) => {
    const params = new URLSearchParams();
    const resolvedYear = input.year === undefined ? selectedYear : input.year;
    const resolvedTag = input.tag === undefined ? selectedTag : input.tag;
    const resolvedPage =
      input.page === undefined ? currentPage : (input.page ?? undefined);

    if (resolvedYear) {
      params.set("year", resolvedYear);
    }

    if (resolvedTag) {
      params.set("tag", resolvedTag);
    }

    if (resolvedPage && resolvedPage > 1) {
      params.set("page", String(resolvedPage));
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  return (
    <Box w="full">
      <Notebook navigation={{}} tags={[]} title={t("title")}>
        {pagination.items.length === 0 ? (
          <Text>{t("empty")}</Text>
        ) : (
          <Stack
            className="not-prose"
            gap="var(--notebook-line-height)"
            py="var(--notebook-line-height)"
          >
            {pagination.items.map((post) => (
              <Stack
                borderLeftColor="green.border"
                borderLeftWidth="2px"
                gap={0}
                key={post.slug}
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
                {post.summary.trim().length > 0 && (
                  <Text
                    fontSize="sm"
                    lineClamp={1}
                    lineHeight="var(--notebook-line-height)"
                  >
                    {post.summary}
                  </Text>
                )}
                <Flex
                  align="center"
                  columnGap={2}
                  lineHeight="var(--notebook-line-height)"
                  rowGap={0}
                  wrap="wrap"
                >
                  <Text fontSize="sm" whiteSpace="nowrap">
                    {post.publishedAt}
                  </Text>
                  {post.tags.length > 0 && (
                    <Text fontSize="sm">{t("metaSeparator")}</Text>
                  )}
                  {post.tags.map((tag) => (
                    <Badge
                      height="var(--notebook-line-height)"
                      key={tag}
                      size="sm"
                      variant="subtle"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Stack>
            ))}
          </Stack>
        )}
        {pagination.totalPages > 1 ? (
          <Box
            aria-label={t("paginationLabel")}
            className="not-prose"
            mt={"var(--notebook-line-height)"}
          >
            <Stack direction="row" gap={2} wrap="wrap">
              <ViewTransitionLink
                aria-disabled={pagination.currentPage <= 1}
                href={buildHref({ page: pagination.currentPage - 1 })}
                lineHeight="var(--notebook-line-height)"
                pointerEvents={pagination.currentPage <= 1 ? "none" : "auto"}
              >
                {t("paginationPrev")}
              </ViewTransitionLink>
              {paginationItems.map((item) => {
                if (item.type === "ellipsis") {
                  return (
                    <Text
                      key={item.key}
                      lineHeight="var(--notebook-line-height)"
                      px={2}
                    >
                      {ELLIPSIS}
                    </Text>
                  );
                }
                return (
                  <ViewTransitionLink
                    fontWeight={item.isCurrent ? "bold" : "normal"}
                    href={buildHref({ page: item.page })}
                    key={item.page}
                    lineHeight="var(--notebook-line-height)"
                    textDecoration={item.isCurrent ? "underline" : "none"}
                  >
                    {item.page}
                  </ViewTransitionLink>
                );
              })}
              <ViewTransitionLink
                aria-disabled={pagination.currentPage >= pagination.totalPages}
                href={buildHref({ page: pagination.currentPage + 1 })}
                lineHeight="var(--notebook-line-height)"
                pointerEvents={
                  pagination.currentPage >= pagination.totalPages
                    ? "none"
                    : "auto"
                }
              >
                {t("paginationNext")}
              </ViewTransitionLink>
            </Stack>
          </Box>
        ) : null}
      </Notebook>
    </Box>
  );
};
