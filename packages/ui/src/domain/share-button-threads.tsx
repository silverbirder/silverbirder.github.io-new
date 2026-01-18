"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiThreads } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildThreadsShareUrl = (url: string, text: string) => {
  const trimmedText = text.trim();
  const trimmedUrl = url.trim();
  const params: string[] = [];
  if (trimmedText) {
    params.push(`text=${encodeURIComponent(trimmedText)}`);
  }
  if (trimmedUrl) {
    params.push(`url=${encodeURIComponent(trimmedUrl)}`);
  }
  return params.length > 0
    ? `https://www.threads.net/intent/post?${params.join("&")}`
    : "https://www.threads.net/intent/post";
};

export const ShareButtonThreads = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const href = buildThreadsShareUrl(url, text);
  const ariaLabel = loading && loadingText ? loadingText : label;

  return (
    <Button
      _active={{ bg: "#2a2a2a" }}
      _disabled={{ opacity: 1 }}
      _hover={{ bg: "#1a1a1a" }}
      alignItems="center"
      aria-label={ariaLabel}
      asChild
      bg="#101010"
      borderRadius="full"
      color="white"
      h={9}
      loading={loading}
      minW={9}
      p={0}
      size="sm"
      variant="solid"
      w={9}
    >
      <a href={href} rel="noopener noreferrer" target="_blank">
        <Icon size="sm">
          <SiThreads />
        </Icon>
      </a>
    </Button>
  );
};
