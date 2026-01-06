"use client";

import { mdxComponents, PostEditorLayout } from "@repo/ui";
import { MDXClient, SerializeResult } from "next-mdx-remote-client";

import { usePostEditorPresenter } from "./post-editor.presenter";

type Props = {
  resolvePreview?: (source: string) => Promise<SerializeResult>;
};

export const PostEditor = ({ resolvePreview }: Props) => {
  const {
    body,
    isLoading,
    onBodyChange,
    onTitleChange,
    previewBody,
    previewSource,
    previewStatus,
    title,
  } = usePostEditorPresenter({ resolvePreview });

  const compiledPreview =
    previewSource && "compiledSource" in previewSource ? previewSource : null;

  return (
    <PostEditorLayout
      bodyValue={body}
      isLoading={isLoading}
      onBodyChange={onBodyChange}
      onTitleChange={onTitleChange}
      previewState={
        previewStatus === "ready" && compiledPreview
          ? {
              content: (
                <MDXClient {...compiledPreview} components={mdxComponents} />
              ),
              status: "ready",
            }
          : previewStatus === "raw"
            ? { body: previewBody, status: "raw" }
            : previewStatus === "empty"
              ? { status: "empty" }
              : previewStatus === "error"
                ? { status: "error" }
                : { status: "loading" }
      }
      titleValue={title}
    />
  );
};
