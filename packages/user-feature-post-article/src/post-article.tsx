"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook, ViewTransitionLink } from "@repo/ui";
import { useTranslations } from "next-intl";

type Props = {
  compiledSource: string;
  meta: {
    postNumber?: number;
    publishedAt: string;
    tags: string[];
    title: string;
  };
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
  relatedPosts: {
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
  const cleanedRelatedPosts = relatedPosts;

  return (
    <Box w="full">
      <Notebook
        navigation={navigation}
        postNumber={meta.postNumber}
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
