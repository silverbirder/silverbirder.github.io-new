import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

import { getPostFrontmatter, getPostSlugs } from "@/libs";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

const notebookLineHeightPx = 48;
const notebookLineColor = "#e2e8f0";
const notebookPaperColor = "#ffffff";
const notebookBorderColor = "#cbd5e1";
const notebookMarginLineColor = "#fca5a5";

const estimateTextWidth = (text: string) => {
  // Rough heuristic for mixing ASCII and CJK.
  // ASCII is narrower; CJK roughly full-width.
  let width = 0;
  for (const char of text) {
    width += char.match(/[\u0020-\u007e]/) ? 0.6 : 1;
  }
  return width;
};

const truncateToWidth = (text: string, maxWidth: number) => {
  if (estimateTextWidth(text) <= maxWidth) return text;
  const chars = Array.from(text);

  let low = 0;
  let high = chars.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = chars.slice(0, mid).join("");
    if (estimateTextWidth(candidate) <= maxWidth) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return chars.slice(0, Math.max(low, 0)).join("");
};

const buildTitleLines = async (title: string) => {
  const cleanTitle = title;
  if (!cleanTitle) return [] as string[];

  const maxLines = 3;
  const maxWidth = 18; // tuned for fontSize ~64-72
  const ellipsis = "...";
  const ellipsisWidth = estimateTextWidth(ellipsis);

  let segments: string[] = [];

  try {
    const mod = await import("budoux");
    // Prefer the approach from: https://github.com/google/budoux
    // (Parser + jaModel). Keep a fallback for other export shapes.
    const maybeParserCtor =
      "Parser" in mod ? (mod as { Parser?: unknown }).Parser : null;
    const maybeJaModel =
      "jaModel" in mod ? (mod as { jaModel?: unknown }).jaModel : null;

    if (maybeParserCtor && maybeJaModel) {
      const Parser = maybeParserCtor as new (model: unknown) => {
        parse: (text: string) => string[];
      };
      const parser = new Parser(maybeJaModel);
      segments = parser.parse(cleanTitle);
    } else {
      const loadDefaultJapaneseParser =
        "loadDefaultJapaneseParser" in mod
          ? (mod as { loadDefaultJapaneseParser: () => unknown })
              .loadDefaultJapaneseParser
          : null;

      if (loadDefaultJapaneseParser) {
        const maybeParser = loadDefaultJapaneseParser();
        const parser =
          typeof (maybeParser as Promise<unknown>)?.then === "function"
            ? await (maybeParser as Promise<{ parse: (t: string) => string[] }>)
            : (maybeParser as { parse: (t: string) => string[] });
        segments = parser.parse(cleanTitle);
      }
    }
  } catch {
    // fall back
  }

  if (segments.length === 0) {
    // Fallback: preserve spaces but avoid empty chunks.
    segments = cleanTitle.split(/(\s+)/).filter(Boolean);
  }

  const lines: string[] = [];
  let current = "";

  for (const segment of segments) {
    const next = `${current}${segment}`;
    if (!current) {
      // If a single chunk is too wide, hard-truncate.
      if (estimateTextWidth(segment) > maxWidth) {
        lines.push(truncateToWidth(segment, maxWidth));
        current = "";
        continue;
      }
      current = segment;
      continue;
    }

    if (estimateTextWidth(next) <= maxWidth) {
      current = next;
    } else {
      lines.push(current);
      current = segment;
    }

    if (lines.length >= maxLines) break;
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  // If we likely truncated, add ellipsis to the last line.
  const reconstructed = lines.join("");
  const wasTruncated = reconstructed !== cleanTitle;
  if (wasTruncated && lines.length > 0) {
    const lastIndex = lines.length - 1;
    const last = lines[lastIndex] ?? "";
    const lastTrimmed = last.trimEnd();
    const lastAllowedWidth = Math.max(maxWidth - ellipsisWidth, 0);
    lines[lastIndex] =
      `${truncateToWidth(lastTrimmed, lastAllowedWidth)}${ellipsis}`;
  }

  return lines;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function OpenGraphImage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let title = "";
  try {
    const frontmatter = await getPostFrontmatter(slug);
    title = frontmatter.title ?? "";
  } catch {
    notFound();
  }

  if (!title) {
    notFound();
  }

  const titleLines = await buildTitleLines(title);

  const logo = await readFile(
    new URL("../../../../../public/assets/logo.png", import.meta.url),
  );
  const logoBase64 = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#f1f5f9",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: notebookPaperColor,
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${notebookLineHeightPx - 1}px, ${notebookLineColor} ${notebookLineHeightPx - 1}px, ${notebookLineColor} ${notebookLineHeightPx}px)`,
          border: `1px solid ${notebookBorderColor}`,
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.18)",
          display: "flex",
          flexDirection: "column",
          height: 540,
          justifyContent: "center",
          overflow: "hidden",
          padding: "72px 88px",
          position: "relative",
          width: 1040,
        }}
      >
        <div
          style={{
            backgroundColor: notebookMarginLineColor,
            bottom: 0,
            left: 96,
            opacity: 0.65,
            position: "absolute",
            top: 0,
            width: 2,
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 40,
            marginBottom: notebookLineHeightPx,
            marginLeft: 24,
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#f8fafc",
              border: `1px solid ${notebookBorderColor}`,
              display: "flex",
              height: 120,
              justifyContent: "center",
              width: 120,
            }}
          >
            <img
              alt="silverbirder"
              height={84}
              src={logoBase64}
              style={{ objectFit: "contain" }}
              width={84}
            />
          </div>

          <div
            style={{
              color: "#0f172a",
              display: "flex",
              flexDirection: "column",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: `${notebookLineHeightPx}px`,
            }}
          >
            <span>silverbirder</span>
            <span style={{ color: "#64748b", fontSize: 22, fontWeight: 500 }}>
              blog / contents
            </span>
          </div>
        </div>

        <div
          style={{
            color: "#0f172a",
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: "80px",
            marginLeft: 24,
            paddingRight: 24,
            whiteSpace: "pre-wrap",
          }}
        >
          {titleLines.length > 0 ? (
            titleLines.map((line, index) => (
              <span key={index} style={{ display: "block" }}>
                {line}
              </span>
            ))
          ) : (
            <span>silverbirder</span>
          )}
        </div>

        <div
          style={{
            borderTop: `1px solid ${notebookLineColor}`,
            marginLeft: 24,
            marginTop: notebookLineHeightPx * 2,
            width: "92%",
          }}
        />

        <div
          style={{
            color: "#64748b",
            display: "flex",
            fontSize: 24,
            fontWeight: 500,
            justifyContent: "space-between",
            lineHeight: `${notebookLineHeightPx}px`,
            marginLeft: 24,
            marginTop: notebookLineHeightPx,
            width: "92%",
          }}
        >
          <span>https://silverbirder.github.io</span>
          <span>{slug}</span>
        </div>
      </div>
    </div>,
    size,
  );
}
