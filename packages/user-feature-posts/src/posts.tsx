"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import { Notebook, NotebookPostItem, ViewTransitionLink } from "@repo/ui";
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
  const metaSeparator = t("metaSeparator");
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
      <Notebook navigation={{}} relatedPosts={[]} tags={[]} title={t("title")}>
        {pagination.items.length === 0 ? (
          <Text>{t("empty")}</Text>
        ) : (
          <Stack
            className="not-prose"
            gap="var(--notebook-line-height)"
            py="var(--notebook-line-height)"
          >
            {pagination.items.map((post) => (
              <NotebookPostItem
                key={post.slug}
                metaSeparator={metaSeparator}
                post={post}
              />
            ))}
          </Stack>
        )}
        {pagination.totalPages > 1 ? (
          <Box
            aria-label={t("paginationLabel")}
            className="not-prose"
            my={"var(--notebook-line-height)"}
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
