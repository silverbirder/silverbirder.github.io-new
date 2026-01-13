"use client";

import type { ReactNode } from "react";

import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";

import { ViewTransitionLink } from "./view-transition-link";

export type PostLayoutRenderLink = (props: {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}) => ReactNode;

type PostLayoutHrefInput = {
  page?: null | number;
  tag?: null | string;
  year?: null | string;
};

type Props = {
  children: ReactNode;
  header?: ReactNode;
  sidebar: SidebarProps;
};

type SidebarLabels = {
  filtersAll: string;
  filtersTag: string;
  filtersTitle: string;
  filtersYear: string;
};

type SidebarProps = {
  availableTags: string[];
  availableYears: string[];
  buildHref: (input: PostLayoutHrefInput) => string;
  labels: SidebarLabels;
  renderLink?: PostLayoutRenderLink;
  selectedTag?: null | string;
  selectedYear?: null | string;
};

const defaultRenderLink: PostLayoutRenderLink = ({
  children,
  href,
  isActive,
}) => {
  return (
    <ViewTransitionLink fontWeight={isActive ? "bold" : "normal"} href={href}>
      {children}
    </ViewTransitionLink>
  );
};

export const PostLayout = ({ children, header, sidebar }: Props) => {
  const {
    availableTags,
    availableYears,
    buildHref,
    labels,
    renderLink,
    selectedTag = null,
    selectedYear = null,
  } = sidebar;

  const resolvedRenderLink = renderLink ?? defaultRenderLink;

  return (
    <Container maxW="6xl" py={10}>
      {header}

      <Flex align="start" direction={{ base: "column", md: "row" }} gap={10}>
        <Box flex="1" minW={0}>
          {children}
        </Box>

        <Box as="nav" flexShrink={0} w={{ base: "full", md: "260px" }}>
          <Heading as="h2" mb={4} size="sm">
            {labels.filtersTitle}
          </Heading>

          <Stack gap={6}>
            <Box>
              <Text fontWeight="semibold" mb={2}>
                {labels.filtersYear}
              </Text>
              <Stack as="ul" gap={1} listStyleType="none" ps={0}>
                <Box as="li">
                  {resolvedRenderLink({
                    children: labels.filtersAll,
                    href: buildHref({ page: 1, year: null }),
                    isActive: !selectedYear,
                  })}
                </Box>

                {availableYears.map((year) => (
                  <Box as="li" key={year}>
                    {resolvedRenderLink({
                      children: year,
                      href: buildHref({ page: 1, year }),
                      isActive: selectedYear === year,
                    })}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb={2}>
                {labels.filtersTag}
              </Text>
              <Stack as="ul" gap={1} listStyleType="none" ps={0}>
                <Box as="li">
                  {resolvedRenderLink({
                    children: labels.filtersAll,
                    href: buildHref({ page: 1, tag: null }),
                    isActive: !selectedTag,
                  })}
                </Box>

                {availableTags.map((tag) => (
                  <Box as="li" key={tag}>
                    {resolvedRenderLink({
                      children: tag,
                      href: buildHref({ page: 1, tag }),
                      isActive: selectedTag === tag,
                    })}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};
