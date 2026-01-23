"use client";

import {
  Avatar,
  Box,
  Link as ChakraLink,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  createFollowSection,
  type FollowLinks,
  Notebook,
  NotebookImage,
} from "@repo/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  followLinks: FollowLinks;
};
const photoMoreLink = "https://silverbirder-cork-board.vercel.app";
const servicesLink = "https://sites.google.com/view/silverbirders-services";
const featuredPhotoUrl =
  "https://res.cloudinary.com/silverbirder/image/upload/v1729856266/silver-birder.github.io/my-photo/photo-38.png";

export const Me = ({ followLinks }: Props) => {
  const t = useTranslations("user.me");
  const tBlog = useTranslations("user.blog");
  const follow = createFollowSection({
    labels: {
      bluesky: tBlog("followBlueskyLabel"),
      github: tBlog("followGithubLabel"),
      heading: t("followHeading"),
      rss: tBlog("followRssLabel"),
      threads: tBlog("followThreadsLabel"),
      x: tBlog("followXLabel"),
    },
    links: followLinks,
  });

  return (
    <Box w="full">
      <Notebook
        follow={follow}
        navigation={{}}
        relatedPosts={[]}
        tags={[]}
        title={t("title")}
      >
        <Box mt={`var(--notebook-line-height)`} mx="auto">
          <Stack gap={0}>
            <VStack gap={0} maxW="34rem" mx="auto" textAlign="center" w="full">
              <Box position="relative">
                <Avatar.Root
                  bg="bg"
                  className="not-prose"
                  shape="full"
                  size="2xl"
                >
                  <Avatar.Image alt={t("name")} src="/assets/logo.png" />
                  <Avatar.Fallback name={t("name")} />
                </Avatar.Root>
                <Box
                  fontSize="2xs"
                  position="absolute"
                  right="-25px"
                  top="-30px"
                  writingMode="vertical-rl"
                >
                  {t("greeting")}
                </Box>
              </Box>
              <VStack gap={0} textAlign="center">
                <Heading as="h2" my={0}>
                  {t("handle")}
                </Heading>
                <Text my={0}>{t("role")}</Text>
              </VStack>
            </VStack>
            <Stack gap={0} maxW="34rem" mx="auto" textAlign="left" w="full">
              <Text mb={0}>{t("leadFirst")}</Text>
              <Text my={0}>{t("leadSecond")}</Text>
              <Text mb={0}>{t("detailFirst")}</Text>
              <Text my={0}>
                {t.rich("detailSecond", {
                  link: (chunks) => (
                    <ChakraLink asChild color="green.fg">
                      <Link
                        href={photoMoreLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {chunks}
                      </Link>
                    </ChakraLink>
                  ),
                })}
              </Text>
              <NotebookImage alt={t("photoAlt")} src={featuredPhotoUrl} />
              <Text my={0}>
                {t.rich("detailThird", {
                  servicesLink: (chunks) => (
                    <ChakraLink asChild color="green.fg">
                      <Link
                        href={servicesLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {chunks}
                      </Link>
                    </ChakraLink>
                  ),
                })}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Notebook>
    </Box>
  );
};
