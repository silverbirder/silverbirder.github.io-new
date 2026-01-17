"use client";

import { Box, Breadcrumb, Heading, Stack, Text } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook, ViewTransitionLink } from "@repo/ui";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Fragment, type ReactNode } from "react";

type BreadcrumbItem = {
  href?: string;
  label: ReactNode;
};

type Props = {
  compiledSource: string;
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
  meta,
  navigation,
  relatedPosts,
}: Props) => {
  const t = useTranslations("user.blog");

  const breadcrumb: BreadcrumbItem[] = meta.title
    ? [{ href: "/blog", label: t("title") }, { label: meta.title }]
    : [{ label: t("title") }];

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
    <Box w="full">
      {breadcrumb.length > 0 ? (
        <Breadcrumb.Root colorPalette="green" mb={4} size="sm">
          <Breadcrumb.List>
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              const href = item.href;
              const label = item.label;

              return (
                <Fragment key={index}>
                  <Breadcrumb.Item>
                    {href && !isLast ? (
                      <ViewTransitionLink href={href}>
                        {label}
                      </ViewTransitionLink>
                    ) : (
                      <Breadcrumb.CurrentLink>{label}</Breadcrumb.CurrentLink>
                    )}
                  </Breadcrumb.Item>

                  {!isLast ? <Breadcrumb.Separator /> : null}
                </Fragment>
              );
            })}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      ) : null}

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
    </Box>
  );
};
