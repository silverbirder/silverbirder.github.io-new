"use client";

import { Box } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook } from "@repo/ui";
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
      summary: string;
      tags: string[];
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
  const shareText = t("shareText", { title: meta.title });
  const share = {
    heading: t("shareHeading"),
    labels: {
      bluesky: t("shareBlueskyLabel"),
      copy: t("shareCopyLabel"),
      copyCopied: t("shareCopyCopied"),
      facebook: t("shareFacebookLabel"),
      hatena: t("shareHatenaLabel"),
      line: t("shareLineLabel"),
      threads: t("shareThreadsLabel"),
      web: t("shareWebLabel"),
      x: t("shareXLabel"),
    },
    text: shareText,
    url: shareUrl,
  };
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
  const follow = {
    heading: t("followHeading"),
    items: followItems,
  };

  return (
    <Box w="full">
      <Notebook
        follow={follow}
        navigation={navigation}
        postNumber={meta.postNumber}
        publishedAt={meta.publishedAt}
        relatedPosts={relatedPosts}
        share={share}
        tags={meta.tags}
        title={meta.title}
      >
        <MdxClientWrapper compiledSource={compiledSource} />
      </Notebook>
    </Box>
  );
};
