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
          <SiLine />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
