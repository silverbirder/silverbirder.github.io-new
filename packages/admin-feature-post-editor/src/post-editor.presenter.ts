"use client";

import type { SerializeResult } from "next-mdx-remote-client/serialize";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  resolvePreview?: (source: string) => Promise<SerializeResult>;
};

export const usePostEditorPresenter = ({ resolvePreview }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [previewSource, setPreviewSource] = useState<null | SerializeResult>(
    null,
  );
  const [previewFetchStatus, setPreviewFetchStatus] = useState<
    "error" | "idle" | "loading" | "ready"
  >("idle");
  const requestIdRef = useRef(0);
  const isEmpty = body.trim().length === 0;
  const shouldResolvePreview = typeof resolvePreview === "function";
  const isPreviewLoading = previewFetchStatus === "loading";
  const hasPreviewError = previewFetchStatus === "error";
  const showError = hasPreviewError;
  const showLoading = isPreviewLoading;

  useEffect(() => {
    if (!shouldResolvePreview) {
      setPreviewSource(null);
      setPreviewFetchStatus("idle");
      return;
    }

    if (isEmpty) {
      setPreviewSource(null);
      setPreviewFetchStatus("idle");
      return;
    }

    const timeout = setTimeout(async () => {
      setPreviewFetchStatus("loading");
      const requestId = (requestIdRef.current += 1);

      try {
        const data = await resolvePreview(body);
        if (requestId !== requestIdRef.current) {
          return;
        }

        if ("error" in data) {
          setPreviewSource(null);
          setPreviewFetchStatus("error");
          return;
        }

        setPreviewSource(data);
        setPreviewFetchStatus("ready");
      } catch {
        if (requestId !== requestIdRef.current) {
          return;
        }

        setPreviewFetchStatus("error");
      }
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [body, isEmpty, resolvePreview, shouldResolvePreview]);

  const previewStatus = useMemo(() => {
    if (showError) {
      return "error";
    }

    if (showLoading) {
      return "loading";
    }

    if (isEmpty) {
      return "empty";
    }

    if (!shouldResolvePreview) {
      return "raw";
    }

    if (previewSource) {
      return "ready";
    }

    return "loading";
  }, [isEmpty, previewSource, shouldResolvePreview, showError, showLoading]);

  return {
    body,
    isLoading: isPreviewLoading,
    onBodyChange: setBody,
    onTitleChange: setTitle,
    previewBody: body,
    previewSource,
    previewStatus,
    title,
  };
};
