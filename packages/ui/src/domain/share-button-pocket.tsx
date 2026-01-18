"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiPocket } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildPocketShareUrl = (url: string, text: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(text);
  return `https://getpocket.com/save?url=${encodedUrl}&title=${encodedTitle}`;
};

export const ShareButtonPocket = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const href = buildPocketShareUrl(url, text);

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
          <SiPocket />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
