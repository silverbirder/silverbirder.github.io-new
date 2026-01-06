"use client";

import { mdxComponents, PostEditorLayout } from "@repo/ui";
import { MDXClient, SerializeResult } from "next-mdx-remote-client";

import { usePostEditorPresenter } from "./post-editor.presenter";

type Props = {
  resolvePreview: (source: string) => Promise<SerializeResult>;
};

export const PostEditor = ({ resolvePreview }: Props) => {
  const {
    body,
    isPreviewLoading,
    onBodyChange,
    onTitleChange,
    previewSource,
    title,
  } = usePostEditorPresenter({ resolvePreview });

  return (
    <PostEditorLayout
      bodyValue={body}
      onBodyChange={onBodyChange}
      onTitleChange={onTitleChange}
      previewContent={
        previewSource && "compiledSource" in previewSource ? (
          <MDXClient {...previewSource} components={mdxComponents} />
        ) : null
      }
      previewIsLoading={isPreviewLoading}
      titleValue={title}
    />
  );
};
