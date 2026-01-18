"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiBluesky } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildBlueskyShareUrl = (url: string, text: string) => {
  const composedText = url ? `${text} ${url}` : text;
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(
    composedText,
  )}`;
};

export const ShareButtonBluesky = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const href = buildBlueskyShareUrl(url, text);
  const ariaLabel = loading && loadingText ? loadingText : label;

  return (
    <Button
      _active={{ bg: "#0059c7" }}
      _disabled={{ opacity: 1 }}
      _hover={{ bg: "#0068e6" }}
      alignItems="center"
      aria-label={ariaLabel}
      asChild
      bg="#007bff"
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
          <SiBluesky />
        </Icon>
      </a>
    </Button>
  );
};
