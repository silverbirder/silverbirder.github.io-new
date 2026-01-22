"use client";

import type { LinkProps } from "@chakra-ui/react";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from "react";

import { Link } from "@chakra-ui/react";
import { Children, isValidElement } from "react";

import { NotebookImage } from "./notebook-image";
import { TweetEmbed } from "./tweet-embed";

const extractTweetId = (href?: string) => {
  if (!href) {
    return null;
  }
  try {
    const url = new URL(href);
    const hostname = url.hostname.replace(/^www\./, "");
    if (hostname !== "twitter.com" && hostname !== "x.com") {
      return null;
    }
    const match = url.pathname.match(/\/status\/(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
};

const normalizeChildren = (children: ReactNode) => {
  return Children.toArray(children).filter((child) => {
    if (typeof child === "string") return child.length > 0;
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
  colorPalette = "green",
  href,
  ...props
}: LinkProps) => {
  const onlyChild = getSingleElementChild(children);

  if (href && onlyChild && onlyChild.type === NotebookImage) {
    const imageElement = onlyChild as ReactElement<
      ComponentProps<typeof NotebookImage>
    >;

    return <NotebookImage {...imageElement.props} linkHref={href} />;
  }

  return (
    <Link colorPalette={colorPalette} href={href} {...props}>
      {children}
    </Link>
  );
};

const Paragraph = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
  const onlyChild = getSingleElementChild(children);

  if (onlyChild && onlyChild.type === Anchor) {
    const tweetId = extractTweetId(
      (onlyChild.props as undefined | { href?: string })?.href,
    );
    if (tweetId) {
      return <TweetEmbed id={tweetId} />;
    }
  }

  if (
    onlyChild &&
    (onlyChild.type === NotebookImage || onlyChild.type === Anchor)
  ) {
    return <>{children}</>;
  }

  return <p {...props}>{children}</p>;
};

export const mdxComponents = {
  a: Anchor,
  img: NotebookImage,
  p: Paragraph,
};
