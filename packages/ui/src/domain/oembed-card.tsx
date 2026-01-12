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
    <Link
      _hover={{ textDecoration: "none" }}
      display="block"
      href={url}
      rel="noopener noreferrer nofollow"
      target="_blank"
      textDecoration="none"
    >
      <Card.Root
        bg="bg.muted"
        borderRadius="0"
        borderWidth="0"
        flexDirection="column"
        overflow="hidden"
        variant="outline"
      >
        {image ? (
          <chakra.div height="12rem" width="100%">
            <Image
              alt=""
              height="100%"
              objectFit="contain"
              src={image}
              width="100%"
            />
          </chakra.div>
        ) : null}
        <Card.Body
          display="flex"
          flex="1"
          flexDirection="column"
          fontSize="sm"
          gap="0"
          lineHeight="var(--notebook-line-height)"
          p="1rem"
        >
          <VStack align="start" gap="0">
            <Card.Title
              color="fg"
              fontSize="sm"
              fontWeight="semibold"
              lineClamp={2}
              lineHeight="inherit"
            >
              {displayTitle}
            </Card.Title>
            {description ? (
              <Card.Description
                color="fg.muted"
                fontSize="sm"
                lineClamp={2}
                lineHeight="inherit"
              >
                {description}
              </Card.Description>
            ) : null}
          </VStack>
          <HStack gap="0.5rem">
            {favicon ? <Image alt="" boxSize="1rem" src={favicon} /> : null}
            <Text
              color="fg.muted"
              fontSize="sm"
              lineClamp={1}
              lineHeight="inherit"
            >
              {displaySite}
            </Text>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
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
