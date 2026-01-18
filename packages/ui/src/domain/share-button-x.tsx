"use client";

import { Button, Icon } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildXShareUrl = (url: string, text: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
};

export const ShareButtonX = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const href = buildXShareUrl(url, text);

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
          <FaXTwitter />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
