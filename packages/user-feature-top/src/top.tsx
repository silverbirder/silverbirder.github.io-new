"use client";

import type { ReactNode } from "react";

import { Box } from "@chakra-ui/react";
import { Notebook } from "@repo/ui";
import { useTranslations } from "next-intl";

type Props = {
  children?: ReactNode;
};

export const Top = ({ children }: Props) => {
  const t = useTranslations("user.top");

  return (
    <Box w="full">
      <Notebook navigation={{}} relatedPosts={[]} tags={[]} title={t("title")}>
        <p>{t("lead")}</p>
        <p>{t("detail")}</p>
        {children}
      </Notebook>
    </Box>
  );
};
