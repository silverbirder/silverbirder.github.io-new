"use client";

import { Button, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

type Props = {
  label: string;
  loading?: boolean;
  loadingText?: string;
  url: string;
};

export const ShareButtonCopy = ({
  label,
  loading,
  loadingText,
  url,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<null | number>(null);

  const handleClick = async () => {
    const payload = url.trim();
    if (!payload || typeof navigator === "undefined") {
      return;
    }
    const { clipboard } = navigator;
    if (!clipboard?.writeText) {
      return;
    }

    try {
      await clipboard.writeText(payload);
      setCopied(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <Button
      _disabled={{ color: "gray.900", opacity: 1 }}
      alignItems="center"
      data-copied={copied ? "true" : "false"}
      gap={2}
      loading={loading}
      loadingText={loadingText}
      onClick={handleClick}
      size="sm"
      type="button"
      variant="outline"
    >
      <Icon size="sm">{copied ? <MdCheck /> : <MdContentCopy />}</Icon>
      {label}
    </Button>
  );
};
