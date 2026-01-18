"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiHatenabookmark } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildHatenaShareUrl = (url: string, text: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(text);
  return `https://b.hatena.ne.jp/entry/panel/?url=${encodedUrl}&btitle=${encodedTitle}`;
};

export const ShareButtonHatena = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const href = buildHatenaShareUrl(url, text);

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
          <SiHatenabookmark />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
