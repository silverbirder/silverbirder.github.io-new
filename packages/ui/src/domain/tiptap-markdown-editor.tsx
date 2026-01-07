"use client";

import type { Editor } from "@tiptap/react";

import { chakra } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo } from "react";
import { Markdown } from "tiptap-markdown";

import { NotebookProse } from "./notebook-prose";

type Props = {
  ariaLabel?: string;
  isDisabled?: boolean;
  onChange: (nextMarkdown: string) => void;
  value: string;
};

const Wrapper = chakra("div", {
  base: {
    borderColor: "border.muted",
    borderRadius: "0.75rem",
    borderWidth: "1px",
    overflow: "hidden",
  },
});

const getMarkdownFromEditor = (editor: Editor) => {
  const storage = editor.storage as {
    markdown?: { getMarkdown?: () => string };
  };
  return storage.markdown?.getMarkdown?.() ?? "";
};

const normalizeMarkdownForTextarea = (markdown: string) => {
  return markdown.replace(/\\\r?\n/g, "\n");
};

export const TiptapMarkdownEditor = ({
  ariaLabel,
  isDisabled,
  onChange,
  value,
}: Props) => {
  const extensions = useMemo(
    () => [
      StarterKit,
      Markdown.configure({
        html: false,
        transformPastedText: true,
      }),
    ],
    [],
  );

  const editor = useEditor({
    content: value,
    editable: !(isDisabled ?? false),
    editorProps: {
      attributes: {
        "aria-label": ariaLabel ?? "Markdown editor",
        "aria-multiline": "true",
        class: "tiptap",
        role: "textbox",
      },
    },
    extensions,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(normalizeMarkdownForTextarea(getMarkdownFromEditor(editor)));
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = getMarkdownFromEditor(editor);
    if (current === value) return;

    // setContent supports markdown format when Markdown extension is enabled.
    editor.commands.setContent(value);
  }, [editor, value]);

  return (
    <Wrapper aria-disabled={isDisabled}>
      <NotebookProse
        css={{
          // TipTap adds a wrapper element for the content.
          "& .ProseMirror": {
            outline: "none",
          },
          "& .ProseMirror:focus-visible": {
            outline: "none",
          },

          // Keep the same min height even when empty.
          "& .ProseMirror > *:first-of-type": {
            marginTop: "0",
          },

          // Editor UX: keep paragraphs tight so Enter goes to the next line
          // without looking like a blank line.
          "& .ProseMirror p": {
            marginBottom: "0",
            marginTop: "0",
          },
        }}
      >
        <EditorContent editor={editor} />
      </NotebookProse>
    </Wrapper>
  );
};
