"use client";

import { Button, Icon } from "@chakra-ui/react";
import { MdRssFeed } from "react-icons/md";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  url: string;
};

export const RssButton = ({ label, loading, loadingText, url }: Props) => {
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
      <a href={url} rel="noopener noreferrer" target="_blank">
        <Icon size="sm">
          <MdRssFeed />
        </Icon>
        {label}
      </a>
    </Button>
  );
};
