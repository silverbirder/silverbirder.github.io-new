"use client";

import { mdxComponents, PostEditorLayout } from "@repo/ui";
import { MDXClient, SerializeResult } from "next-mdx-remote-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { usePostEditorPresenter } from "./post-editor.presenter";

type Props = {
  resolvePreview: (source: string) => Promise<SerializeResult>;
  uploadImage: (formData: FormData) => Promise<{ url: string }>;
};

export const PostEditor = ({ resolvePreview, uploadImage }: Props) => {
  const {
    body,
    isPreviewLoading,
    onBodyChange,
    onTitleChange,
    previewSource,
    title,
  } = usePostEditorPresenter({ resolvePreview });
  const [isUploading, setIsUploading] = useState(false);
  const bodyRef = useRef(body);
  const bodyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    bodyRef.current = body;
  }, [body]);

  const uploadImageToCloudinary = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const payload = await uploadImage(formData);

      if (!payload.url) {
        throw new Error("Upload response is missing url.");
      }

      return payload.url;
    },
    [uploadImage],
  );

  const normalizeAltText = useCallback((fileName: string) => {
    const trimmed = fileName.replace(/\.[^.]+$/, "");
    const replaced = trimmed.replace(/[-_]+/g, " ").trim();
    return replaced.length > 0 ? replaced : "image";
  }, []);

  const buildMarkdownImage = useCallback(
    (file: File, url: string) => {
      const alt = normalizeAltText(file.name);
      return `![${alt}](${url})`;
    },
    [normalizeAltText],
  );

  const insertAtCursor = useCallback(
    (snippet: string) => {
      const textarea = bodyTextareaRef.current;
      const currentBody = bodyRef.current;

      if (!textarea) {
        onBodyChange(`${currentBody}${currentBody ? "\n\n" : ""}${snippet}`);
        return;
      }

      const selectionStart = textarea.selectionStart ?? currentBody.length;
      const selectionEnd = textarea.selectionEnd ?? currentBody.length;
      const before = currentBody.slice(0, selectionStart);
      const after = currentBody.slice(selectionEnd);
      const needsLeadingSpace = before.length > 0 && !before.endsWith("\n");
      const needsTrailingSpace = after.length > 0 && !after.startsWith("\n");
      const prefix = needsLeadingSpace ? "\n\n" : "";
      const suffix = needsTrailingSpace ? "\n" : "";
      const nextBody = `${before}${prefix}${snippet}${suffix}${after}`;

      onBodyChange(nextBody);

      requestAnimationFrame(() => {
        const cursor = before.length + prefix.length + snippet.length;
        textarea.focus();
        textarea.setSelectionRange(cursor, cursor);
      });
    },
    [onBodyChange],
  );

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      setIsUploading(true);

      try {
        const uploadedUrls = await Promise.all(
          acceptedFiles.map((file) => uploadImageToCloudinary(file)),
        );
        const markdown = acceptedFiles
          .map((file, index) => {
            const url = uploadedUrls[index];
            return url ? buildMarkdownImage(file, url) : null;
          })
          .filter((value): value is string => value !== null)
          .join("\n\n");

        insertAtCursor(markdown);
      } catch {
        // ignore upload errors to avoid breaking the editor flow
      } finally {
        setIsUploading(false);
      }
    },
    [buildMarkdownImage, insertAtCursor, uploadImageToCloudinary],
  );

  const dropzoneConfig = useMemo(
    () => ({
      accept: { "image/*": [] },
      multiple: true,
      noClick: true,
      noKeyboard: true,
      onDrop: handleDrop,
    }),
    [handleDrop],
  );
  const { getInputProps, getRootProps, isDragActive } =
    useDropzone(dropzoneConfig);

  return (
    <PostEditorLayout
      bodyDropzoneInputProps={getInputProps()}
      bodyDropzoneProps={getRootProps()}
      bodyTextareaRef={bodyTextareaRef}
      bodyValue={body}
      isBodyDragActive={isDragActive}
      isLoading={isUploading}
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
