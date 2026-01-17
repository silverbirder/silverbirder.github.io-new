"use client";

import type { LinkProps } from "@chakra-ui/react";

import { Link } from "@chakra-ui/react";
import * as React from "react";

const ViewTransitionComponent = (
  React as unknown as { ViewTransition?: unknown }
).ViewTransition as
  | React.ComponentType<{
      children: React.ReactNode;
      name?: string;
      update?: string;
    }>
  | undefined;

type Props = LinkProps & {
  children: React.ReactNode;
  transitionName?: string;
  transitionUpdate?: string;
};

export const ViewTransitionLink = ({
  colorPalette = "green",
  transitionName,
  transitionUpdate,
  ...linkProps
}: Props) => {
  const link = <Link colorPalette={colorPalette} {...linkProps} />;

  if (!ViewTransitionComponent) {
    return link;
  }

  return (
    <ViewTransitionComponent name={transitionName} update={transitionUpdate}>
      {link}
    </ViewTransitionComponent>
  );
};
