"use client";

import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

import { chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { NotebookProse } from "./notebook-prose";

type Props = {
  bodyDropzoneInputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
  };
  bodyDropzoneProps?: HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
  };
  bodyTextareaRef?: Ref<HTMLTextAreaElement>;
  bodyValue: string;
  isBodyDragActive?: boolean;
  isLoading?: boolean;
  onBodyChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  previewContent: null | ReactNode;
  previewIsLoading?: boolean;
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

const BodyDropzone = chakra("div", {
  base: {
    display: "flex",
    flexDirection: "column",
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

export const PostEditorLayout = ({
  bodyDropzoneInputProps,
  bodyDropzoneProps,
  bodyTextareaRef,
  bodyValue,
  isBodyDragActive = false,
  isLoading = false,
  onBodyChange,
  onTitleChange,
  previewContent,
  previewIsLoading,
  titleValue,
}: Props) => {
  const t = useTranslations("admin.postEditor");
  const isPreviewLoading = previewIsLoading ?? previewContent == null;

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
            <BodyDropzone
              {...bodyDropzoneProps}
              data-testid="post-editor-body-dropzone"
            >
              {bodyDropzoneInputProps ? (
                <input {...bodyDropzoneInputProps} hidden />
              ) : null}
              <Textarea
                borderColor={isBodyDragActive ? "fg" : undefined}
                data-testid="post-editor-body"
                disabled={isLoading}
                name="body"
                onChange={(event) => onBodyChange(event.target.value)}
                placeholder={t("contentPlaceholder")}
                ref={bodyTextareaRef}
                value={bodyValue}
              />
            </BodyDropzone>
          </FieldGroup>
        </EditorPanel>
        <PreviewPanel>
          <PanelTitle>{t("previewTitle")}</PanelTitle>
          <NotebookProse
            aria-busy={isPreviewLoading}
            data-testid="post-editor-preview"
          >
            {previewContent ?? <p>{t("previewTitle")}</p>}
          </NotebookProse>
        </PreviewPanel>
      </EditorGrid>
    </Main>
  );
};
