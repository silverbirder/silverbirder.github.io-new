"use client";

import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "@repo/ui";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

export const ArtifactsSection = () => {
  const t = useTranslations("user.me");
  const artifacts = {
    books: [
      {
        image:
          "https://res.cloudinary.com/silverbirder/image/upload/v1696334257/silver-birder.github.io/artifacts/Introduction-to-webcomponents-for-beginners.jpg",
        link: "https://www.amazon.co.jp/gp/product/B08CY2QCFV/",
        title: t("artifacts.books.introWebComponents.title"),
      },
    ],
    githubProjects: [
      {
        description: t("artifacts.githubProjects.oEmbed.description"),
        link: "https://www.webcomponents.org/element/silverbirder/o-embed",
        name: t("artifacts.githubProjects.oEmbed.name"),
      },
      {
        description: t("artifacts.githubProjects.ogpMe.description"),
        link: "https://www.webcomponents.org/element/silverbirder/ogp-me",
        name: t("artifacts.githubProjects.ogpMe.name"),
      },
      {
        description: t(
          "artifacts.githubProjects.googleAccountPhotoApi.description",
        ),
        link: "https://github.com/silverbirder/Google-Account-Photo-API",
        name: t("artifacts.githubProjects.googleAccountPhotoApi.name"),
      },
      {
        description: t("artifacts.githubProjects.caat.description"),
        link: "https://github.com/silverbirder/CaAT",
        name: t("artifacts.githubProjects.caat.name"),
      },
      {
        description: t("artifacts.githubProjects.cotlin.description"),
        link: "https://github.com/silverbirder/Cotlin",
        name: t("artifacts.githubProjects.cotlin.name"),
      },
      {
        description: t("artifacts.githubProjects.rMinc.description"),
        link: "https://github.com/silverbirder/rMinc",
        name: t("artifacts.githubProjects.rMinc.name"),
      },
      {
        description: t("artifacts.githubProjects.tiqav2.description"),
        link: "https://github.com/silverbirder/tiqav2",
        name: t("artifacts.githubProjects.tiqav2.name"),
      },
      {
        description: t(
          "artifacts.githubProjects.zoomMeetingCreator.description",
        ),
        link: "https://github.com/silverbirder/zoom-meeting-creator",
        name: t("artifacts.githubProjects.zoomMeetingCreator.name"),
      },
    ],
  } as const;

  return (
    <Stack gap={0} maxW="34rem" mx="auto" w="full">
      <Heading as="h2" mb={0}>
        {t("artifacts.heading")}
      </Heading>
      <Heading as="h3" lineHeight="var(--notebook-line-height)" mb={0}>
        {t("artifacts.booksHeading")}
      </Heading>
      <Stack gap={0}>
        {artifacts.books.map((book) => (
          <Box as="figure" key={book.link} marginX={0} width="fit">
            <Image
              asChild
              borderColor="border.muted"
              borderRadius="0"
              borderStyle="solid"
              borderWidth="1px"
              display="block"
              h={{
                base: "calc(var(--notebook-line-height) * 5)",
                md: "calc(var(--notebook-line-height) * 6)",
              }}
              marginX="0"
              marginY="0"
              maxWidth="100%"
              objectFit="contain"
              width="auto"
            >
              <NextImage
                alt={book.title}
                height={1500}
                loading="lazy"
                src={book.image}
                width={1057}
              />
            </Image>
            <Text
              as="figcaption"
              lineHeight="var(--notebook-line-height)"
              textAlign="center"
            >
              <Link href={book.link}>{book.title}</Link>
            </Text>
          </Box>
        ))}
      </Stack>
      <Heading as="h3" lineHeight="var(--notebook-line-height)">
        {t("artifacts.webServicesHeading")}
      </Heading>
      <Link href={t("artifacts.webServicesLink")}>
        {t("artifacts.webServicesLinkLabel")}
      </Link>
      <Heading as="h3" lineHeight="var(--notebook-line-height)" mb={0}>
        {t("artifacts.githubHeading")}
      </Heading>
      <Stack as="ul" gap={0}>
        {artifacts.githubProjects.map((project) => (
          <Box as="li" key={project.link}>
            <HStack alignItems="flex-start" gap={0}>
              <Link href={project.link}>{project.name}</Link>
            </HStack>
            <Stack as="ul" gap={0}>
              <Text as="li">{project.description}</Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
