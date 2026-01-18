"use client";

import type { ComponentProps } from "react";

import { chakra, Icon } from "@chakra-ui/react";
import { FaTag } from "react-icons/fa6";

import { ViewTransitionLink } from "./view-transition-link";

type Props = Omit<
  ComponentProps<typeof ViewTransitionLink>,
  "children" | "href"
> & {
  tag: string;
};

const buildTagHref = (tag: string) => `/blog?tag=${encodeURIComponent(tag)}`;

export const Tag = ({ tag, ...linkProps }: Props) => {
  return (
    <ViewTransitionLink
      _hover={{ bg: "bg", textDecoration: "none" }}
      alignItems="center"
      color="green.fg"
      display="inline-flex"
      fontSize="xs"
      fontWeight="600"
      gap={"0.5"}
      height="calc(var(--notebook-line-height) * 1)"
      href={buildTagHref(tag)}
      justifyContent="center"
      textDecoration="none"
      {...linkProps}
    >
      <Icon size="sm">
        <FaTag />
      </Icon>
      <chakra.span>{tag}</chakra.span>
    </ViewTransitionLink>
  );
};
