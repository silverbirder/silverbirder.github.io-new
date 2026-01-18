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

  return (
    <Button
      _disabled={{ color: "gray.900", opacity: 1 }}
      alignItems="center"
      asChild
      gap={2}
      loading={loading}
      loadingText={loadingText}
      size="sm"
      variant="outline"
    >
      <a href={href} rel="noopener noreferrer" target="_blank">
        <Icon size="sm">
          <SiBluesky />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
