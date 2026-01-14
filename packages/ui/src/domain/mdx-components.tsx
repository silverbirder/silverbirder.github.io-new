"use client";

import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from "react";

import { Children, isValidElement } from "react";

import { NotebookImage } from "./notebook-image";
import { OembedCard } from "./oembed-card";

const normalizeChildren = (children: ReactNode) => {
  return Children.toArray(children).filter((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    if (typeof child === "boolean") return false;
    return child != null;
  });
};

const getSingleElementChild = (children: ReactNode): null | ReactElement => {
  const normalized = normalizeChildren(children);
  if (normalized.length !== 1) return null;
  const child = normalized[0];
  return isValidElement(child) ? child : null;
};

const Anchor = ({
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  const onlyChild = getSingleElementChild(children);

  if (href && onlyChild && onlyChild.type === NotebookImage) {
    const imageElement = onlyChild as ReactElement<
      ComponentProps<typeof NotebookImage>
    >;

    return <NotebookImage {...imageElement.props} linkHref={href} />;
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

const Paragraph = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
  const onlyChild = getSingleElementChild(children);

  if (
    onlyChild &&
    (onlyChild.type === NotebookImage ||
      onlyChild.type === OembedCard ||
      onlyChild.type === Anchor)
  ) {
    return <>{children}</>;
  }

  return <p {...props}>{children}</p>;
};

export const mdxComponents = {
  a: Anchor,
  img: NotebookImage,
  OembedCard,
  p: Paragraph,
};
