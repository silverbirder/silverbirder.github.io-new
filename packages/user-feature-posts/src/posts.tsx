"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

import {
  filterPosts,
  getAvailableTags,
  getAvailableYears,
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
  const availableYears = getAvailableYears(normalizedPosts);
  const availableTags = getAvailableTags(normalizedPosts);
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
    <Container maxW="6xl" py={10}>
      <Heading as="h1" mb={6} size="lg">
        {t("title")}
      </Heading>

      <Flex align="start" direction={{ base: "column", md: "row" }} gap={10}>
        <Box flex="1" minW={0}>
          <Heading as="h2" mb={2} size="md">
            {t("latestHeading")}
          </Heading>
          <Text fontSize="sm" mb={6}>
            {t("metaCount", { count: filteredPosts.length })}
          </Text>

          {pagination.items.length === 0 ? (
            <Text>{t("empty")}</Text>
          ) : (
            <Stack as="ul" gap={4} listStyleType="none" ps={0}>
              {pagination.items.map((post) => (
                <Box as="li" key={post.slug}>
                  <Stack gap={1}>
                    <Link
                      as={NextLink}
                      fontWeight="semibold"
                      href={`/blog/contents/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                    <Text fontSize="sm">
                      {post.publishedAt}
                      {post.tags.length > 0
                        ? ` / ${post.tags.join(" , ")}`
                        : ""}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}

          {pagination.totalPages > 1 ? (
            <Box aria-label={t("paginationLabel")} mt={8}>
              <Flex align="center" gap={2} wrap="wrap">
                <Link
                  aria-disabled={pagination.currentPage <= 1}
                  as={NextLink}
                  href={buildHref({ page: pagination.currentPage - 1 })}
                  pointerEvents={pagination.currentPage <= 1 ? "none" : "auto"}
                >
                  {t("paginationPrev")}
                </Link>

                {paginationItems.map((item) => {
                  if (item.type === "ellipsis") {
                    return (
                      <Text key={item.key} px={2}>
                        {ELLIPSIS}
                      </Text>
                    );
                  }

                  return (
                    <Link
                      as={NextLink}
                      fontWeight={item.isCurrent ? "bold" : "normal"}
                      href={buildHref({ page: item.page })}
                      key={item.page}
                      textDecoration={item.isCurrent ? "underline" : "none"}
                    >
                      {item.page}
                    </Link>
                  );
                })}

                <Link
                  aria-disabled={
                    pagination.currentPage >= pagination.totalPages
                  }
                  as={NextLink}
                  href={buildHref({ page: pagination.currentPage + 1 })}
                  pointerEvents={
                    pagination.currentPage >= pagination.totalPages
                      ? "none"
                      : "auto"
                  }
                >
                  {t("paginationNext")}
                </Link>
              </Flex>
            </Box>
          ) : null}
        </Box>

        <Box as="nav" flexShrink={0} w={{ base: "full", md: "260px" }}>
          <Heading as="h2" mb={4} size="sm">
            {t("filtersTitle")}
          </Heading>

          <Stack gap={6}>
            <Box>
              <Text fontWeight="semibold" mb={2}>
                {t("filtersYear")}
              </Text>
              <Stack as="ul" gap={1} listStyleType="none" ps={0}>
                <Box as="li">
                  <Link
                    as={NextLink}
                    fontWeight={!selectedYear ? "bold" : "normal"}
                    href={buildHref({ page: 1, year: null })}
                  >
                    {t("filtersAll")}
                  </Link>
                </Box>
                {availableYears.map((year) => (
                  <Box as="li" key={year}>
                    <Link
                      as={NextLink}
                      fontWeight={selectedYear === year ? "bold" : "normal"}
                      href={buildHref({ page: 1, year })}
                    >
                      {year}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb={2}>
                {t("filtersTag")}
              </Text>
              <Stack as="ul" gap={1} listStyleType="none" ps={0}>
                <Box as="li">
                  <Link
                    as={NextLink}
                    fontWeight={!selectedTag ? "bold" : "normal"}
                    href={buildHref({ page: 1, tag: null })}
                  >
                    {t("filtersAll")}
                  </Link>
                </Box>
                {availableTags.map((tag) => (
                  <Box as="li" key={tag}>
                    <Link
                      as={NextLink}
                      fontWeight={selectedTag === tag ? "bold" : "normal"}
                      href={buildHref({ page: 1, tag })}
                    >
                      {tag}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};
