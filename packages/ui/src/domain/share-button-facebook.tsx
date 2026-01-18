"use client";

import { Button, Icon } from "@chakra-ui/react";
import { SiFacebook } from "react-icons/si";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

const buildFacebookShareUrl = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
};

export const ShareButtonFacebook = ({
  label,
  loading,
  loadingText,
  url,
}: Props) => {
  const href = buildFacebookShareUrl(url);

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
          <SiFacebook />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
