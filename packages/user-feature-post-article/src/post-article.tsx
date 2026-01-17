"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import {
  MdxClientWrapper,
  Notebook,
  PostLayout,
  ViewTransitionLink,
} from "@repo/ui";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

type Props = {
  compiledSource: string;
  filters: {
    availableTags: string[];
    availableYears: string[];
  };
  meta: {
    publishedAt?: string;
    tags?: string[];
    title?: string;
  };
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
  relatedPosts?: {
    posts: {
      publishedAt?: string;
      slug: string;
      title: string;
    }[];
    tag: string;
  }[];
};

export const PostArticle = ({
  compiledSource,
  filters,
  meta,
  navigation,
  relatedPosts,
}: Props) => {
  const t = useTranslations("user.blog");

  const breadcrumb = meta.title
    ? ([{ href: "/blog", label: t("title") }, { label: meta.title }] as const)
    : ([{ label: t("title") }] as const);

  const buildHref = (input: {
    page?: null | number;
    tag?: null | string;
    year?: null | string;
  }) => {
    const params = new URLSearchParams();

    if (input.year) {
      params.set("year", input.year);
    }

    if (input.tag) {
      params.set("tag", input.tag);
    }

    if (input.page && input.page > 1) {
      params.set("page", String(input.page));
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  const cleanedRelatedPosts =
    relatedPosts
      ?.map((group) => {
        const tag = group.tag.trim();
        if (!tag) {
          return null;
        }

        const posts = group.posts.filter(
          (post) => post.title.trim().length > 0,
        );
        if (posts.length === 0) {
          return null;
        }

        return { posts, tag };
      })
      .filter((group): group is NonNullable<typeof group> => group !== null) ??
    [];

  return (
    <PostLayout
      breadcrumb={[...breadcrumb]}
      sidebar={{
        availableTags: filters.availableTags,
        availableYears: filters.availableYears,
        buildHref,
        selectedTag: null,
        selectedYear: null,
      }}
    >
      <Notebook
        navigation={navigation}
        publishedAt={meta.publishedAt}
        tags={meta.tags}
        title={meta.title}
      >
        <MdxClientWrapper compiledSource={compiledSource} />
      </Notebook>
      {cleanedRelatedPosts.length > 0 && (
        <Box as="section" mt={4}>
          <Heading as="h2" mb={4} size="md">
            {t("relatedHeading")}
          </Heading>
          <Stack gap={6}>
            {cleanedRelatedPosts.map((group) => (
              <Stack as="section" gap={2} key={group.tag}>
                <Heading as="h3" size="sm">
                  {t("relatedTagHeading", { tag: group.tag })}
                </Heading>
                <Stack as="ul" gap={2} listStyleType="none" ps={0}>
                  {group.posts.map((post) => (
                    <Box as="li" key={`${group.tag}-${post.slug}`}>
                      <Stack gap={1}>
                        <ViewTransitionLink
                          as={NextLink}
                          fontWeight="semibold"
                          href={`/blog/contents/${post.slug}`}
                        >
                          {post.title}
                        </ViewTransitionLink>
                        {post.publishedAt && (
                          <Text color="fg.muted" fontSize="sm">
                            {post.publishedAt}
                          </Text>
                        )}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}
    </PostLayout>
  );
};
