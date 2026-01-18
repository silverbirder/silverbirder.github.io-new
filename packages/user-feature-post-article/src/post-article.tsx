"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import {
  MdxClientWrapper,
  Notebook,
  RssButton,
  ShareButtonBluesky,
  ShareButtonCopy,
  ShareButtonFacebook,
  ShareButtonHatena,
  ShareButtonLine,
  ShareButtonPocket,
  ShareButtonX,
  ViewTransitionLink,
} from "@repo/ui";
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
  rssUrl: string;
  shareUrl: string;
};

export const PostArticle = ({
  compiledSource,
  meta,
  navigation,
  relatedPosts,
  rssUrl,
  shareUrl,
}: Props) => {
  const t = useTranslations("user.blog");
  const cleanedRelatedPosts = relatedPosts;
  const shareText = t("shareText", { title: meta.title });

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
      <Box as="section" mt={6}>
        <Heading as="h2" mb={3} size="sm">
          {t("shareHeading")}
        </Heading>
        <Stack
          align="start"
          direction={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          gap={2}
        >
          <ShareButtonX
            label={t("shareXLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonBluesky
            label={t("shareBlueskyLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonHatena
            label={t("shareHatenaLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonLine
            label={t("shareLineLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonFacebook
            label={t("shareFacebookLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonPocket
            label={t("sharePocketLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonCopy label={t("shareCopyLabel")} url={shareUrl} />
        </Stack>
      </Box>
      <Box as="section" mt={4}>
        <Heading as="h2" mb={3} size="sm">
          {t("rssHeading")}
        </Heading>
        <Stack align="start" direction="row" gap={2}>
          <RssButton label={t("rssLabel")} url={rssUrl} />
        </Stack>
      </Box>
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
