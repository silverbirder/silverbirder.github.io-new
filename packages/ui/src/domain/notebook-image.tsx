"use client";

import type { ComponentPropsWithoutRef } from "react";

import { chakra, Icon } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";
import { MdOpenInNew } from "react-icons/md";

type Props = ComponentPropsWithoutRef<"img"> & {
  linkHref?: string;
};

export const NotebookImage = ({ alt, linkHref, onLoad, ...props }: Props) => {
  const t = useTranslations("ui.notebookImage");
  const wrapperRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const altText = alt?.trim();
  const hasCaption = Boolean(altText) || Boolean(linkHref);

  const alignToGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const lineHeight = Number.parseFloat(getComputedStyle(wrapper).lineHeight);
    if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;

    const height = img.getBoundingClientRect().height;
    const remainder = height % lineHeight;
    const extra = remainder === 0 ? 0 : lineHeight - remainder;
    wrapper.style.paddingBottom = `${extra}px`;
  }, []);

  const handleLoad: Props["onLoad"] = (event) => {
    onLoad?.(event);
    alignToGrid();
  };

  const setImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (node?.complete) {
        requestAnimationFrame(alignToGrid);
      }
    },
    [alignToGrid],
  );

  return (
    <chakra.figure
      display="block"
      lineHeight="var(--notebook-line-height)"
      marginX={0}
      marginY="var(--notebook-line-height)"
      ref={wrapperRef}
    >
      <chakra.img
        alt={alt ?? ""}
        bg="bg.muted"
        borderRadius="0"
        boxShadow="none"
        decoding={props.decoding ?? "async"}
        display="block"
        height="auto"
        loading={props.loading ?? "lazy"}
        marginY="0"
        onLoad={handleLoad}
        ref={setImgRef}
        width="100%"
        {...props}
      />

      {hasCaption && (
        <chakra.figcaption
          color="fg.muted"
          display="block"
          fontSize="sm"
          lineHeight="var(--notebook-line-height)"
          margin={0}
          textAlign="center"
        >
          <chakra.span
            alignItems="center"
            display="inline-flex"
            gap="0.5rem"
            justifyContent="center"
          >
            {altText && altText}
            {linkHref && (
              <chakra.a
                aria-label={t("openInNewTabAriaLabel")}
                href={linkHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon color="fg.muted" size="sm">
                  <MdOpenInNew />
                </Icon>
              </chakra.a>
            )}
          </chakra.span>
        </chakra.figcaption>
      )}
    </chakra.figure>
  );
};
