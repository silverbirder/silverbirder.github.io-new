"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Notebook, ViewTransitionLink } from "@repo/ui";
import { useTranslations } from "next-intl";

export const Top = () => {
  const t = useTranslations("user.top");
  const tocItems = [
    {
      key: "first-time",
      links: [
        {
          href: "/me",
          label: t("toc.firstTime.items.me"),
        },
      ],
      title: t("toc.firstTime.title"),
    },
    {
      key: "reader",
      links: [
        {
          href: "/blog",
          label: t("toc.reader.items.blog"),
        },
      ],
      title: t("toc.reader.title"),
    },
  ];

  return (
    <Box w="full">
      <Notebook navigation={{}} relatedPosts={[]} tags={[]} title={t("title")}>
        <VStack alignItems="flex-start" gap={0}>
          <Text mb={0}>{t("welcome")}</Text>
          {tocItems.map((item) => (
            <Box key={item.key}>
              <Heading as="h2">{item.title}</Heading>
              <VStack alignItems="flex-start" gap={0}>
                {item.links.map((link) => (
                  <ViewTransitionLink
                    href={link.href}
                    key={link.href}
                    lineHeight="var(--notebook-line-height)"
                  >
                    {link.label}
                  </ViewTransitionLink>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Notebook>
    </Box>
  );
};
