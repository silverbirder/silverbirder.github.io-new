"use client";

import type { ReactElement, ReactNode } from "react";

import {
  Box,
  Breadcrumb,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";

import { ViewTransitionLink } from "./view-transition-link";

export type PostLayoutRenderLink = (props: {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}) => ReactElement;

type PostLayoutBreadcrumbItem = {
  href?: string;
  label: ReactNode;
};

type PostLayoutHrefInput = {
  page?: null | number;
  tag?: null | string;
  year?: null | string;
};

type Props = {
  breadcrumb?: PostLayoutBreadcrumbItem[];
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

export const PostLayout = ({
  breadcrumb,
  children,
  header,
  sidebar,
}: Props) => {
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
      {breadcrumb && breadcrumb.length > 0 ? (
        <Breadcrumb.Root mb={4} size="sm">
          <Breadcrumb.List>
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              const href = item.href;
              const label = item.label;

              return (
                <Fragment key={index}>
                  <Breadcrumb.Item>
                    {href && !isLast ? (
                      resolvedRenderLink({ children: label, href })
                    ) : (
                      <Breadcrumb.CurrentLink>{label}</Breadcrumb.CurrentLink>
                    )}
                  </Breadcrumb.Item>

                  {!isLast ? <Breadcrumb.Separator /> : null}
                </Fragment>
              );
            })}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      ) : null}

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
