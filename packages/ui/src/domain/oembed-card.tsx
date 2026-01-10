"use client";

import type { ReactNode } from "react";

import {
  Card,
  chakra,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

type LinkPreviewPayload = {
  description?: string;
  favicon?: string;
  hostname?: string;
  image?: string;
  siteName?: string;
  title?: string;
  type: "link";
  url: string;
};

type OembedPayload = {
  html: string;
  type: "oembed";
  url: string;
};

type Payload = LinkPreviewPayload | OembedPayload;

type Props = {
  payload?: string;
  url?: string;
};

const buildHostname = (rawUrl: string) => {
  try {
    return new URL(rawUrl).hostname;
  } catch {
    return rawUrl;
  }
};

const asString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

const decodeBase64 = (value: string) => {
  if (typeof window === "undefined" || typeof window.atob !== "function") {
    return null;
  }
  try {
    const binary = window.atob(value);
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }
    return binary;
  } catch {
    return null;
  }
};

const parsePayload = (
  payload?: string,
  fallbackUrl?: string,
): null | Payload => {
  if (!payload) {
    return null;
  }

  const parseObject = (text: string): null | Payload => {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    if (parsed.type === "oembed") {
      const html = asString(parsed.html);
      const url = asString(parsed.url) ?? fallbackUrl;
      if (!html || !url) {
        return null;
      }
      return { html, type: "oembed", url };
    }
    if (parsed.type === "link") {
      const url = asString(parsed.url) ?? fallbackUrl;
      if (!url) {
        return null;
      }
      return {
        description: asString(parsed.description),
        favicon: asString(parsed.favicon),
        hostname: asString(parsed.hostname),
        image: asString(parsed.image),
        siteName: asString(parsed.siteName),
        title: asString(parsed.title),
        type: "link",
        url,
      };
    }
    return null;
  };

  try {
    const direct = parseObject(payload);
    if (direct) {
      return direct;
    }
  } catch {
    // continue
  }

  const decoded = decodeBase64(payload);
  if (!decoded) {
    return null;
  }

  try {
    return parseObject(decoded);
  } catch {
    return null;
  }
};

const OembedWrapper = ({
  children,
  innerHtml,
}: {
  children?: ReactNode;
  innerHtml?: string;
}) => {
  if (innerHtml !== undefined) {
    return (
      <chakra.div
        className="oembed-card not-prose"
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    );
  }

  return <chakra.div className="oembed-card not-prose">{children}</chakra.div>;
};

const LinkPreviewCard = ({
  description,
  favicon,
  hostname,
  image,
  siteName,
  title,
  url,
}: LinkPreviewPayload) => {
  const resolvedHostname = hostname ?? buildHostname(url);
  const displaySite = siteName ?? resolvedHostname;
  const displayTitle = title ?? displaySite ?? resolvedHostname;

  return (
    <Card.Root variant="outline">
      <Link
        _hover={{ textDecoration: "none" }}
        display="block"
        href={url}
        rel="noopener noreferrer nofollow"
        target="_blank"
        textDecoration="none"
      >
        <Card.Body>
          <HStack align="stretch" gap="4" justify="space-between">
            <VStack align="start" flex="1" gap="1">
              <Text color="fg" fontWeight="semibold" lineClamp={2}>
                {displayTitle}
              </Text>
              {description ? (
                <Text color="fg.muted" fontSize="sm" lineClamp={2}>
                  {description}
                </Text>
              ) : null}
              <HStack gap="2">
                {favicon ? <Image alt="" boxSize="4" src={favicon} /> : null}
                <Text color="fg.muted" fontSize="sm" lineClamp={1}>
                  {displaySite}
                </Text>
              </HStack>
            </VStack>
            {image ? (
              <Image
                alt=""
                borderRadius="md"
                flexShrink={0}
                maxH="120px"
                objectFit="cover"
                src={image}
                width="160px"
              />
            ) : null}
          </HStack>
        </Card.Body>
      </Link>
    </Card.Root>
  );
};

export const OembedCard = ({ payload, url }: Props) => {
  const resolved = parsePayload(payload, url);

  if (resolved?.type === "oembed") {
    return <OembedWrapper innerHtml={resolved.html} />;
  }

  if (resolved?.type === "link") {
    return (
      <OembedWrapper>
        <LinkPreviewCard {...resolved} />
      </OembedWrapper>
    );
  }

  if (!url) {
    return null;
  }

  return (
    <OembedWrapper>
      <LinkPreviewCard hostname={buildHostname(url)} type="link" url={url} />
    </OembedWrapper>
  );
};
