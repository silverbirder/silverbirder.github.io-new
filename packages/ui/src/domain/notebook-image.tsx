"use client";

import type { ComponentPropsWithoutRef } from "react";

import { chakra } from "@chakra-ui/react";
import { useCallback, useRef } from "react";

type Props = ComponentPropsWithoutRef<"img">;

export const NotebookImage = ({ onLoad, ...props }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
    <div ref={wrapperRef}>
      <chakra.img
        alt={props.alt ?? ""}
        decoding={props.decoding ?? "async"}
        display="block"
        height="auto"
        loading={props.loading ?? "lazy"}
        onLoad={handleLoad}
        ref={setImgRef}
        width="100%"
        {...props}
      />
    </div>
  );
};
