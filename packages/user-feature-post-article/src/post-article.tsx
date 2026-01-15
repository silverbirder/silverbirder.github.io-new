"use client";

import type { PostLayoutRenderLink } from "@repo/ui";

import { Link } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook, PostLayout } from "@repo/ui";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

type Props = {
  compiledSource: string;
  filters: {
    availableTags: string[];
    availableYears: string[];
  };
  meta: {
    publishedAt?: string;
    tags?: string[];
    title?: string;
  };
  navigation?: {
    next?: {
      href: string;
      publishedAt?: string;
      title: string;
    };
    prev?: {
      href: string;
      publishedAt?: string;
      title: string;
    };
  };
};

export const PostArticle = ({
  compiledSource,
  filters,
  meta,
  navigation,
}: Props) => {
  const t = useTranslations("user.blog");

  const breadcrumb = meta.title
    ? ([{ href: "/blog", label: t("title") }, { label: meta.title }] as const)
    : ([{ label: t("title") }] as const);

  const buildHref = (input: {
    page?: null | number;
    tag?: null | string;
    year?: null | string;
  }) => {
    const params = new URLSearchParams();

    if (input.year) {
      params.set("year", input.year);
    }

    if (input.tag) {
      params.set("tag", input.tag);
    }

    if (input.page && input.page > 1) {
      params.set("page", String(input.page));
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  const renderSidebarLink: PostLayoutRenderLink = ({
    children,
    href,
    isActive,
  }) => {
    return (
      <Link as={NextLink} fontWeight={isActive ? "bold" : "normal"} href={href}>
        {children}
      </Link>
    );
  };

  return (
    <PostLayout
      breadcrumb={[...breadcrumb]}
      sidebar={{
        availableTags: filters.availableTags,
        availableYears: filters.availableYears,
        buildHref,
        labels: {
          filtersAll: t("filtersAll"),
          filtersTag: t("filtersTag"),
          filtersTitle: t("filtersTitle"),
          filtersYear: t("filtersYear"),
        },
        renderLink: renderSidebarLink,
        selectedTag: null,
        selectedYear: null,
      }}
    >
      <Notebook
        navigation={navigation}
        publishedAt={meta.publishedAt}
        tags={meta.tags}
        title={meta.title}
      >
        <MdxClientWrapper compiledSource={compiledSource} />
      </Notebook>
    </PostLayout>
  );
};
