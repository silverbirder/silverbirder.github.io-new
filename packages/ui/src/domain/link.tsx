"use client";

import type { LinkProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { Link as ChakraLink, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type Props = LinkProps & {
  children: ReactNode;
};

const isExternalHref = (href: string, origin: string) => {
  if (href.startsWith("#") || href.startsWith("/")) {
    return false;
  }

  try {
    const url = new URL(href, origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    return url.origin !== origin;
  } catch {
    return false;
  }
};

export const Link = ({ children, href, ...linkProps }: Props) => {
  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    if (!href || typeof href !== "string" || typeof window === "undefined") {
      setIsExternal(false);
      return;
    }

    setIsExternal(isExternalHref(href, window.location.origin));
  }, [href]);

  const resolvedRel =
    isExternal && !linkProps.rel ? "noopener noreferrer" : linkProps.rel;
  const resolvedTarget =
    isExternal && !linkProps.target ? "_blank" : linkProps.target;
  const resolvedAs =
    linkProps.as ?? (isExternal ? "a" : (NextLink as LinkProps["as"]));

  return (
    <ChakraLink
      color={"green.fg"}
      href={href}
      rel={resolvedRel}
      target={resolvedTarget}
      {...linkProps}
      as={resolvedAs}
    >
      {children}
      {isExternal ? (
        <Icon aria-hidden as={FaArrowUpRightFromSquare} fontSize="xs" ms={1} />
      ) : null}
    </ChakraLink>
  );
};
