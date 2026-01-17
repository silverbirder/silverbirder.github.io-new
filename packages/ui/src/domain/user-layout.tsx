"use client";

import type { ReactNode } from "react";

import { Container } from "@chakra-ui/react";

import { NOTEBOOK_LINE_HEIGHT } from "./notebook-prose";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  return (
    <Container
      centerContent
      maxW="6xl"
      py={`calc(${NOTEBOOK_LINE_HEIGHT} / 2)`}
    >
      {children}
    </Container>
  );
};
