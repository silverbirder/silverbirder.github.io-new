import { getLinkPreview } from "link-preview-js";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const LINK_FETCH_TIMEOUT_MS = 4000;
const LINK_FETCH_CONCURRENCY = 4;
const MAX_LINK_FETCH = 20;

const isHttpUrl = (rawUrl: string) => {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const getPreviewTitle = (preview: unknown) => {
  if (!preview || typeof preview !== "object") {
    return null;
  }

  if (!("title" in preview)) {
    return null;
  }

  const title = (preview as { title?: unknown }).title;
  return typeof title === "string" ? title : null;
};

const resolveDocumentTitle = async (url: string) => {
  try {
    const preview = await getLinkPreview(url, {
      followRedirects: "follow",
      headers: {
        "user-agent": "AdminLinkResolver/1.0",
      },
      timeout: LINK_FETCH_TIMEOUT_MS,
    });

    const title = getPreviewTitle(preview);
    if (!title) {
      return null;
    }

    const normalized = title.replace(/\s+/g, " ").trim();
    return normalized.length > 0 ? normalized : null;
  } catch {
    return null;
  }
};

const runWithConcurrency = async <Input, Output>(
  items: Input[],
  limit: number,
  task: (item: Input) => Promise<Output>,
) => {
  if (items.length === 0) {
    return [];
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

type LinkCandidate = {
  node: LinkNode;
  url: string;
};

type LinkChild = {
  type?: string;
  value?: string;
};

type LinkNode = UnistNode & {
  children?: LinkChild[];
  type: "link";
  url: string;
};

type TitleEntry = readonly [string, string];

type UnistNode = {
  [key: string]: unknown;
  type?: string;
};

const createRemarkLinkTitlePlugin = () => {
  return async (tree: unknown) => {
    const linkCandidates: LinkCandidate[] = [];
    visit(tree as Parameters<typeof visit>[0], "link", (node: LinkNode) => {
      const url = typeof node?.url === "string" ? node.url : null;
      if (!url || !isHttpUrl(url)) {
        return;
      }
      if (
        Array.isArray(node?.children) &&
        node.children.some((child: LinkChild) => child?.type === "image")
      ) {
        return;
      }
      linkCandidates.push({ node, url });
    });

    if (linkCandidates.length === 0) {
      return;
    }

    const uniqueUrls = Array.from(
      new Set(linkCandidates.map((candidate) => candidate.url)),
    ).slice(0, MAX_LINK_FETCH);

    const titles = await runWithConcurrency<string, null | TitleEntry>(
      uniqueUrls,
      LINK_FETCH_CONCURRENCY,
      async (url) => {
        const title = await resolveDocumentTitle(url);
        return title ? ([url, title] as const) : null;
      },
    );

    const replacementMap = new Map<string, string>();
    for (const entry of titles) {
      if (!entry) {
        continue;
      }
      const [url, title] = entry;
      const hostname = new URL(url).hostname;
      replacementMap.set(url, `${title} - ${hostname}`);
    }

    if (replacementMap.size === 0) {
      return;
    }

    for (const candidate of linkCandidates) {
      const replacement = replacementMap.get(candidate.url);
      if (!replacement) {
        continue;
      }
      candidate.node.children = [{ type: "text", value: replacement }];
    }
  };
};

const resolveLinkTitlesInMarkdown = async (source: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(createRemarkLinkTitlePlugin)
    .use(remarkStringify)
    .process(source);

  return String(file);
};

export const resolveLinkTitles = async (source: string) => {
  "use server";
  return resolveLinkTitlesInMarkdown(source);
};
