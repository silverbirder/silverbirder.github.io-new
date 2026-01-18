"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiLine } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildLineShareUrl = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  return `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
};

export const ShareButtonLine = ({
  label,
  loading,
  loadingText,
  url,
}: Props) => {
  const href = buildLineShareUrl(url);
  const ariaLabel = loading && loadingText ? loadingText : label;

  return (
    <Button
      _active={{ bg: "#049a40" }}
      _disabled={{ opacity: 1 }}
      _hover={{ bg: "#05b34b" }}
      alignItems="center"
      aria-label={ariaLabel}
      asChild
      bg="#06c755"
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
          <SiLine />
        </Icon>
      </a>
    </Button>
  );
};
