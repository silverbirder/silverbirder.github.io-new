"use client";

import { Box, Heading, Icon, Text, Timeline, VStack } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook, ViewTransitionLink } from "@repo/ui";
import { NOTEBOOK_LINE_HEIGHT } from "@repo/ui";
import { useTranslations } from "next-intl";
import { FaBookmark, FaCommentDots, FaShareNodes } from "react-icons/fa6";

import type { TimelineItem } from "./timeline";

type Props = {
  timelineItems?: TimelineItem[];
};

export const Top = ({ timelineItems = [] }: Props) => {
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
  const timelineIconMap = {
    bookmark: FaBookmark,
    share: FaShareNodes,
    tweet: FaCommentDots,
  } as const;

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
          <Box my={NOTEBOOK_LINE_HEIGHT}>
            <Heading as="h2" mt={0}>
              {t("timeline.heading")}
            </Heading>
            <Timeline.Root variant="subtle">
              {timelineItems.map((item) => (
                <Timeline.Item gap={0} key={item.key}>
                  <Timeline.Connector>
                    <Timeline.Separator
                      borderColor="green.solid"
                      insetInline="calc(var(--notebook-line-height) / 2)"
                      transform="translateY(4px)"
                    />
                    <Timeline.Indicator
                      bg="transparent"
                      color="green.contrast"
                      h="var(--notebook-line-height)"
                      outline="none"
                      w="var(--notebook-line-height)"
                    >
                      <Box
                        alignItems="center"
                        bg="green.solid"
                        borderRadius="full"
                        display="flex"
                        h={6}
                        justifyContent="center"
                        w={6}
                      >
                        <Icon as={timelineIconMap[item.type]} fontSize="xs" />
                      </Box>
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content gap={0} pb="var(--notebook-line-height)">
                    <Timeline.Title lineHeight="var(--notebook-line-height)">
                      {item.date}
                    </Timeline.Title>
                    <Timeline.Description lineHeight="var(--notebook-line-height)">
                      {item.compiledSource ? (
                        <Box css={{ "& *": { marginBlock: 0 } }} w="full">
                          <MdxClientWrapper
                            compiledSource={item.compiledSource}
                          />
                        </Box>
                      ) : null}
                    </Timeline.Description>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline.Root>
          </Box>
        </VStack>
      </Notebook>
    </Box>
  );
};
