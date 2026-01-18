"use client";

import { Button, Icon } from "@chakra-ui/react";
import { MdShare } from "react-icons/md";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  text: string;
  url: string;
};

export const ShareButtonWeb = ({
  label,
  loading,
  loadingText,
  text,
  url,
}: Props) => {
  const ariaLabel = loading && loadingText ? loadingText : label;

  const handleClick = async () => {
    const payload = url.trim();
    if (!payload || typeof navigator === "undefined") {
      return;
    }

    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({ text, url: payload });
    } catch {
      // ignore share failures
    }
  };

  return (
    <Button
      _active={{ bg: "#334155" }}
      _disabled={{ opacity: 1 }}
      _hover={{ bg: "#1e293b" }}
      alignItems="center"
      aria-label={ariaLabel}
      bg="#0f172a"
      borderRadius="full"
      color="white"
      h={9}
      loading={loading}
      minW={9}
      onClick={handleClick}
      p={0}
      size="sm"
      type="button"
      variant="solid"
      w={9}
    >
      <Icon size="sm">
        <MdShare />
      </Icon>
    </Button>
  );
};
