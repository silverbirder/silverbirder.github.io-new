import type { NextRequest } from "next/server";

import iconv from "iconv-lite";

export const runtime = "nodejs";

const OEMBED_ENDPOINT = "https://noembed.com/embed?url=";
const FETCH_TIMEOUT_MS = 4000;

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const asString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

const buildHostname = (rawUrl: string) => {
  try {
    return new URL(rawUrl).hostname;
  } catch {
    return undefined;
  }
};

const corsHeaders = () => ({
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
});

const fetchOembed = async (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${OEMBED_ENDPOINT}${encodeURIComponent(url)}`, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { error?: string; html?: string };
    if (data.error || !data.html) {
      return null;
    }

    return data.html;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const normalizeCharset = (charset: string) => {
  const normalized = charset.trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "utf8") {
    return "utf-8";
  }
  if (
    normalized === "shift-jis" ||
    normalized === "shiftjis" ||
    normalized === "sjis"
  ) {
    return "shift_jis";
  }
  if (normalized === "windows-31j") {
    return "win31j";
  }
  return normalized;
};

const detectCharset = (contentType: string, buffer: Buffer) => {
  const fromHeader = contentType.match(/charset=([^;]+)/i)?.[1];
  if (fromHeader) {
    return normalizeCharset(fromHeader);
  }

  const ascii = buffer.toString("latin1");
  const metaCharset = ascii.match(/<meta[^>]+charset=["']?([^"'>\s]+)/i)?.[1];
  if (metaCharset) {
    return normalizeCharset(metaCharset);
  }
  const metaContent = ascii.match(
    /<meta[^>]+http-equiv=["']content-type["'][^>]*content=["'][^"']*charset=([^"']+)/i,
  )?.[1];
  if (metaContent) {
    return normalizeCharset(metaContent);
  }

  return "utf-8";
};

const getAttr = (tag: string, name: string) => {
  const match = tag.match(
    new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  if (!match) {
    return undefined;
  }
  return (match[2] || match[3] || match[4] || "").trim();
};

const resolveUrl = (value: string, baseUrl: string) => {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
};

const extractHtmlMetadata = (html: string, baseUrl: string) => {
  const metaTags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const linkTags = html.match(/<link\s+[^>]*>/gi) ?? [];
  const data: {
    description?: string;
    favicon?: string;
    image?: string;
    siteName?: string;
    title?: string;
  } = {};

  for (const tag of metaTags) {
    const property = getAttr(tag, "property") ?? getAttr(tag, "name");
    const content = getAttr(tag, "content");
    if (!property || !content) {
      continue;
    }
    const key = property.toLowerCase();
    if (key === "og:title") {
      data.title ??= content;
    }
    if (key === "twitter:title") {
      data.title ??= content;
    }
    if (key === "description" || key === "og:description") {
      data.description ??= content;
    }
    if (key === "twitter:description") {
      data.description ??= content;
    }
    if (key === "og:site_name") {
      data.siteName ??= content;
    }
    if (key === "og:image") {
      data.image ??= resolveUrl(content, baseUrl);
    }
    if (key === "twitter:image") {
      data.image ??= resolveUrl(content, baseUrl);
    }
  }

  for (const tag of linkTags) {
    const rel = getAttr(tag, "rel")?.toLowerCase() ?? "";
    if (!rel.includes("icon")) {
      continue;
    }
    const href = getAttr(tag, "href");
    if (href) {
      data.favicon ??= resolveUrl(href, baseUrl);
    }
  }

  if (!data.title) {
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch?.[1]) {
      data.title = titleMatch[1].trim();
    }
  }

  return data;
};

const fetchHtmlMetadata = async (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        accept: "text/html,*/*",
        "user-agent": "OembedProxy/1.0",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      return null;
    }
    const contentType = res.headers.get("content-type") ?? "";
    const buffer = Buffer.from(await res.arrayBuffer());
    const charset = detectCharset(contentType, buffer);
    const html = iconv.decode(buffer, charset);
    return extractHtmlMetadata(html, url);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const resolveLinkPreview = async (url: string) => {
  const resolvedUrl = url;
  const fallback = {
    hostname: buildHostname(url),
    url,
  };

  try {
    const htmlMeta = await fetchHtmlMetadata(url);
    if (!htmlMeta) {
      return fallback;
    }
    const title = asString(htmlMeta.title);
    const description = asString(htmlMeta.description);
    const siteName = asString(htmlMeta.siteName);
    const image = asString(htmlMeta.image);
    const favicon = asString(htmlMeta.favicon);

    return {
      description,
      favicon,
      hostname: buildHostname(resolvedUrl) ?? buildHostname(url),
      image,
      siteName,
      title,
      url: resolvedUrl,
    };
  } catch {
    return fallback;
  }
};

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url") ?? "";

  if (!isHttpUrl(url)) {
    return Response.json(
      { error: "Invalid url" },
      { headers: corsHeaders(), status: 400 },
    );
  }

  const oembedHtml = await fetchOembed(url);
  if (oembedHtml) {
    return Response.json(
      { html: oembedHtml, type: "oembed", url },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control":
            "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }

  const preview = await resolveLinkPreview(url);
  return Response.json(
    { type: "link", ...preview },
    {
      headers: {
        ...corsHeaders(),
        "Cache-Control":
          "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}

export function OPTIONS() {
  return new Response(null, { headers: corsHeaders(), status: 204 });
}
