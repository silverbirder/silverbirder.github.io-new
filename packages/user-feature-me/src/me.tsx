"use client";

import type { ReactNode } from "react";

import { Box } from "@chakra-ui/react";
import { Notebook } from "@repo/ui";
import { useTranslations } from "next-intl";

type Props = {
  children?: ReactNode;
};

export const Me = ({ children }: Props) => {
  const t = useTranslations("user.me");

  return (
    <Box w="full">
      <Notebook navigation={{}} tags={[]} title={t("title")}>
        <p>{t("lead")}</p>
        <p>{t("detail")}</p>
        {children}
      </Notebook>
    </Box>
  );
};
