"use client";

import { Box, Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import {
  MdxClientWrapper,
  Notebook,
  ShareButtonBluesky,
  ShareButtonCopy,
  ShareButtonFacebook,
  ShareButtonHatena,
  ShareButtonLine,
  ShareButtonThreads,
  ShareButtonWeb,
  ShareButtonX,
  ViewTransitionLink,
} from "@repo/ui";
import { useTranslations } from "next-intl";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { MdRssFeed } from "react-icons/md";
import { SiBluesky, SiThreads } from "react-icons/si";

type Props = {
  compiledSource: string;
  followLinks: {
    bluesky: string;
    github: string;
    rss: string;
    threads: string;
    x: string;
  };
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
  shareUrl: string;
};

export const PostArticle = ({
  compiledSource,
  followLinks,
  meta,
  navigation,
  relatedPosts,
  shareUrl,
}: Props) => {
  const t = useTranslations("user.blog");
  const cleanedRelatedPosts = relatedPosts;
  const shareText = t("shareText", { title: meta.title });
  const followItems = [
    {
      active: "#1f1f1f",
      bg: "#000000",
      hover: "#111111",
      href: followLinks.x,
      icon: <FaXTwitter />,
      label: t("followXLabel"),
    },
    {
      active: "#0059c7",
      bg: "#007bff",
      hover: "#0068e6",
      href: followLinks.bluesky,
      icon: <SiBluesky />,
      label: t("followBlueskyLabel"),
    },
    {
      active: "#191c20",
      bg: "#24292f",
      hover: "#1f2328",
      href: followLinks.github,
      icon: <FaGithub />,
      label: t("followGithubLabel"),
    },
    {
      active: "#2a2a2a",
      bg: "#101010",
      hover: "#1a1a1a",
      href: followLinks.threads,
      icon: <SiThreads />,
      label: t("followThreadsLabel"),
    },
    {
      active: "#c95410",
      bg: "#f97316",
      hover: "#e46514",
      href: followLinks.rss,
      icon: <MdRssFeed />,
      label: t("followRssLabel"),
    },
  ];

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
        <Stack align="start" direction="row" flexWrap="wrap" gap={2}>
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
          <ShareButtonThreads
            label={t("shareThreadsLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonWeb
            label={t("shareWebLabel")}
            text={shareText}
            url={shareUrl}
          />
          <ShareButtonCopy
            copiedLabel={t("shareCopyCopied")}
            label={t("shareCopyLabel")}
            url={shareUrl}
          />
        </Stack>
      </Box>
      <Box as="section" mt={4}>
        <Heading as="h2" mb={3} size="sm">
          {t("followHeading")}
        </Heading>
        <Stack align="start" direction="row" flexWrap="wrap" gap={2}>
          {followItems.map((item) => (
            <Button
              _active={{ bg: item.active }}
              _hover={{ bg: item.hover }}
              alignItems="center"
              aria-label={item.label}
              asChild
              bg={item.bg}
              borderRadius="full"
              color="white"
              h={9}
              key={item.label}
              minW={9}
              p={0}
              size="sm"
              variant="solid"
              w={9}
            >
              <a href={item.href} rel="noopener noreferrer" target="_blank">
                <Icon size="sm">{item.icon}</Icon>
              </a>
            </Button>
          ))}
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
