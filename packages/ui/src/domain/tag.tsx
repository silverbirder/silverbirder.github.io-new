"use client";

import type { ComponentProps } from "react";

import { chakra, Icon } from "@chakra-ui/react";
import { FaCalendarDays, FaTag } from "react-icons/fa6";

import { ViewTransitionLink } from "./view-transition-link";

type Props = Omit<ComponentProps<typeof ViewTransitionLink>, "children"> & {
  iconType?: "tag" | "year";
  isSelected?: boolean;
  tag: string;
};

const buildTagHref = (tag: string) => `/blog?tag=${encodeURIComponent(tag)}`;
const buildYearHref = (year: string) =>
  `/blog?year=${encodeURIComponent(year)}`;

export const Tag = ({
  href,
  iconType = "tag",
  isSelected = false,
  tag,
  ...linkProps
}: Props) => {
  const IconComponent = iconType === "year" ? FaCalendarDays : FaTag;
  const resolvedHref =
    href ?? (iconType === "year" ? buildYearHref(tag) : buildTagHref(tag));

  return (
    <ViewTransitionLink
      _hover={{ bg: "transparent", textDecoration: "none" }}
      alignItems="center"
      aria-label={iconType === "year" ? `Filter by year ${tag}` : undefined}
      color="green.fg"
      display="inline-flex"
      fontSize="xs"
      fontWeight={isSelected ? "700" : "600"}
      gap={"0.5"}
      height="calc(var(--notebook-line-height) * 1)"
      href={resolvedHref}
      justifyContent="center"
      textDecoration={isSelected ? "underline" : "none"}
      aria-current={isSelected ? "page" : undefined}
      {...linkProps}
    >
      <Icon aria-hidden as={IconComponent} boxSize="1em" />
      <chakra.span>{tag}</chakra.span>
    </ViewTransitionLink>
  );
};
