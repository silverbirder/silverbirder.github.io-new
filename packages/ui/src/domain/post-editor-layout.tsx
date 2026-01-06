"use client";

import type { ReactNode } from "react";

import { chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { NotebookProse } from "./notebook-prose";

type PostEditorPreviewState =
  | { body: string; status: "raw" }
  | { content: ReactNode; status: "ready" }
  | { status: "empty" }
  | { status: "error" }
  | { status: "loading" };

type Props = {
  bodyValue: string;
  isLoading?: boolean;
  onBodyChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  previewState: PostEditorPreviewState;
  titleValue: string;
};

const Main = chakra("main", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginInline: "auto",
    maxWidth: "1200px",
    paddingBlock: { base: "2rem", md: "3rem" },
    paddingInline: { base: "1.5rem", md: "3rem" },
  },
});

const Header = chakra("header", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
});

const HeaderRow = chakra("div", {
  base: {
    alignItems: "center",
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
  },
});

const Title = chakra("h1", {
  base: {
    fontSize: { base: "2rem", md: "2.5rem" },
    fontWeight: "700",
    letterSpacing: "-0.02em",
  },
});

const Description = chakra("p", {
  base: {
    color: "fg.muted",
    fontSize: "md",
    maxWidth: "60ch",
  },
});

const EditorGrid = chakra("div", {
  base: {
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: { base: "1fr", lg: "1fr 1fr" },
  },
});

const EditorPanel = chakra("section", {
  base: {
    background: "bg",
    borderColor: "border.muted",
    borderRadius: "1rem",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    padding: "1.5rem",
  },
});

const PreviewPanel = chakra("section", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
});

const PanelTitle = chakra("h2", {
  base: {
    color: "fg.muted",
    fontSize: "0.7rem",
    fontWeight: "700",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
});

const FieldGroup = chakra("label", {
  base: {
    color: "fg",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9rem",
    fontWeight: "600",
    gap: "0.5rem",
  },
});

const Input = chakra("input", {
  base: {
    _focusVisible: {
      borderColor: "fg",
      outline: "none",
    },
    background: "bg",
    borderColor: "border.muted",
    borderRadius: "0.75rem",
    borderWidth: "1px",
    color: "fg",
    fontSize: "1rem",
    paddingBlock: "0.75rem",
    paddingInline: "0.9rem",
    width: "100%",
  },
});

const Textarea = chakra("textarea", {
  base: {
    _focusVisible: {
      borderColor: "fg",
      outline: "none",
    },
    background: "bg",
    borderColor: "border.muted",
    borderRadius: "0.75rem",
    borderWidth: "1px",
    color: "fg",
    fontSize: "1rem",
    minHeight: "18rem",
    paddingBlock: "0.85rem",
    paddingInline: "0.9rem",
    resize: "vertical",
    width: "100%",
  },
});

const StatusText = chakra("p", {
  base: {
    fontSize: "0.95rem",
    fontStyle: "italic",
    margin: 0,
  },
});

const PreviewRaw = chakra("pre", {
  base: {
    whiteSpace: "pre-wrap",
  },
});

export const PostEditorLayout = ({
  bodyValue,
  isLoading = false,
  onBodyChange,
  onTitleChange,
  previewState,
  titleValue,
}: Props) => {
  const t = useTranslations("admin.postEditor");
  const isPreviewLoading = previewState.status === "loading";

  const renderPreview = () => {
    switch (previewState.status) {
      case "empty":
        return <StatusText>{t("previewEmpty")}</StatusText>;
      case "error":
        return <StatusText role="alert">{t("error")}</StatusText>;
      case "loading":
        return <StatusText>{t("loading")}</StatusText>;
      case "raw":
        return <PreviewRaw>{previewState.body}</PreviewRaw>;
      case "ready":
        return previewState.content;
      default:
        return null;
    }
  };

  return (
    <Main>
      <Header>
        <HeaderRow>
          <Title>{t("title")}</Title>
        </HeaderRow>
        <Description>{t("description")}</Description>
      </Header>
      <EditorGrid>
        <EditorPanel aria-busy={isLoading} data-testid="post-editor">
          <PanelTitle>{t("editorTitle")}</PanelTitle>
          <FieldGroup>
            {t("titleLabel")}
            <Input
              disabled={isLoading}
              name="title"
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder={t("titlePlaceholder")}
              type="text"
              value={titleValue}
            />
          </FieldGroup>
          <FieldGroup>
            {t("contentLabel")}
            <Textarea
              data-testid="post-editor-body"
              disabled={isLoading}
              name="body"
              onChange={(event) => onBodyChange(event.target.value)}
              placeholder={t("contentPlaceholder")}
              value={bodyValue}
            />
          </FieldGroup>
        </EditorPanel>
        <PreviewPanel>
          <PanelTitle>{t("previewTitle")}</PanelTitle>
          <NotebookProse
            aria-busy={isPreviewLoading}
            data-testid="post-editor-preview"
          >
            {renderPreview()}
          </NotebookProse>
        </PreviewPanel>
      </EditorGrid>
    </Main>
  );
};
