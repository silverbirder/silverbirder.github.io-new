import { Buffer } from "node:buffer";
import { visit } from "unist-util-visit";

const OEMBED_ENDPOINT = "https://noembed.com/embed?url=";
const FETCH_TIMEOUT_MS = 4000;
const MAX_LINK_FETCH = 20;
const LINK_FETCH_CONCURRENCY = 4;

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

type ParentNode = UnistNode & {
  children: UnistNode[];
};

type Payload = LinkPreviewPayload | OembedPayload;

type UnistNode = {
  [key: string]: unknown;
  children?: UnistNode[];
  position?: {
    end?: { line?: number };
    start?: { line?: number };
  };
  type?: string;
  url?: string;
  value?: string;
};

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const isTweetStatusUrl = (rawUrl: string) => {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace(/^www\./, "");
    if (hostname !== "twitter.com" && hostname !== "x.com") {
      return false;
    }
    return /\/status\/(\d+)/.test(url.pathname);
  } catch {
    return false;
  }
};

const resolvePlainLink = (node: UnistNode) => {
  if (!Array.isArray(node.children) || node.children.length === 0) {
    return null;
  }

  const chunks: string[] = [];

  for (const child of node.children) {
    if (!child) {
      continue;
    }
    if (child.type === "text" && typeof child.value === "string") {
      chunks.push(child.value);
      continue;
    }
    if (child.type === "link" && typeof child.url === "string") {
      const text = child.children
        ?.filter((entry) => entry?.type === "text")
        .map((entry) => (typeof entry?.value === "string" ? entry.value : ""))
        .join("");
      if (!text || text.trim() !== child.url) {
        return null;
      }
      chunks.push(child.url);
      continue;
    }
    return null;
  }

  const combined = chunks.join("").trim();
  return isHttpUrl(combined) ? combined : null;
};

const hasBlankLineAround = (node: UnistNode, source?: string) => {
  if (!source || typeof source !== "string") {
    return false;
  }
  const startLine = node.position?.start?.line;
  const endLine = node.position?.end?.line;
  if (!startLine || !endLine) {
    return false;
  }

  const lines = source.split(/\r?\n/);
  const beforeLine = lines[startLine - 2];
  const afterLine = lines[endLine];
  const isBlank = (line?: string) => line !== undefined && line.trim() === "";

  return isBlank(beforeLine) && isBlank(afterLine);
};

const isBlockedParent = (parent: null | undefined | UnistNode) => {
  if (!parent) {
    return true;
  }
  const blocked = new Set([
    "blockquote",
    "list",
    "listItem",
    "table",
    "tableCell",
    "tableRow",
  ]);
  return blocked.has(parent.type ?? "");
};

const resolveApiEndpoint = (url: string) => {
  const base = process.env.NEXT_PUBLIC_OEMBED_API_URL?.trim();
  if (!base) {
    return `${OEMBED_ENDPOINT}${encodeURIComponent(url)}`;
  }
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}url=${encodeURIComponent(url)}`;
};

const fetchPayload = async (url: string): Promise<null | Payload> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(resolveApiEndpoint(url), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as null | Record<string, unknown>;
    if (!data) {
      return null;
    }

    if (data.type === "oembed" && typeof data.html === "string") {
      const resolvedUrl = typeof data.url === "string" ? data.url : url;
      const payload: OembedPayload = {
        html: data.html,
        type: "oembed",
        url: resolvedUrl,
      };
      return payload;
    }

    if (data.type === "link" && typeof data.url === "string") {
      const payload: LinkPreviewPayload = {
        description:
          typeof data.description === "string" ? data.description : undefined,
        favicon: typeof data.favicon === "string" ? data.favicon : undefined,
        hostname: typeof data.hostname === "string" ? data.hostname : undefined,
        image: typeof data.image === "string" ? data.image : undefined,
        siteName: typeof data.siteName === "string" ? data.siteName : undefined,
        title: typeof data.title === "string" ? data.title : undefined,
        type: "link",
        url: data.url,
      };
      return payload;
    }

    if (typeof data.html === "string") {
      const payload: OembedPayload = { html: data.html, type: "oembed", url };
      return payload;
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const runWithConcurrency = async <Input, Output>(
  items: Input[],
  limit: number,
  task: (item: Input) => Promise<Output>,
) => {
  if (items.length === 0) {
    return [] as Output[];
  }

  const results: Output[] = new Array(items.length);
  let index = 0;

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const currentIndex = index;
        index += 1;
        const item = items[currentIndex];
        if (item === undefined) {
          continue;
        }
        results[currentIndex] = await task(item);
      }
    },
  );

  await Promise.all(workers);
  return results;
};

const encodePayload = (payload: Payload) =>
  Buffer.from(JSON.stringify(payload), "utf8").toString("base64");

export const createRemarkOembed = () => {
  return async (tree: undefined | UnistNode, file?: { value?: unknown }) => {
    if (!tree || typeof tree !== "object") {
      return;
    }
    const targets: Array<{ index: number; parent: ParentNode; url: string }> =
      [];

    visit(
      tree as Parameters<typeof visit>[0],
      "paragraph",
      (node, index, parent) => {
        if (isBlockedParent(parent as null | undefined | UnistNode)) {
          return;
        }
        if (!parent || typeof index !== "number") {
          return;
        }
        const url = resolvePlainLink(node as UnistNode);
        if (!url) {
          return;
        }
        if (isTweetStatusUrl(url)) {
          return;
        }
        const source = typeof file?.value === "string" ? file.value : undefined;
        if (!hasBlankLineAround(node as UnistNode, source)) {
          return;
        }
        targets.push({ index, parent: parent as ParentNode, url });
      },
    );

    if (targets.length === 0) {
      return;
    }

    const uniqueUrls = Array.from(
      new Set(targets.map((item) => item.url)),
    ).slice(0, MAX_LINK_FETCH);

    const payloads = await runWithConcurrency(
      uniqueUrls,
      LINK_FETCH_CONCURRENCY,
      (url) => fetchPayload(url),
    );

    const payloadMap = new Map<string, Payload>();
    uniqueUrls.forEach((url, i) => {
      const payload = payloads[i];
      if (payload) {
        payloadMap.set(url, payload);
      }
    });

    for (const target of targets) {
      const payload = payloadMap.get(target.url);
      const attributes: UnistNode[] = [
        { name: "url", type: "mdxJsxAttribute", value: target.url },
      ];

      if (payload) {
        attributes.push({
          name: "payload",
          type: "mdxJsxAttribute",
          value: encodePayload(payload),
        });
      }

      const node: UnistNode = {
        attributes,
        children: [],
        name: "OembedCard",
        type: "mdxJsxFlowElement",
      };

      target.parent.children[target.index] = node;
    }
  };
};
