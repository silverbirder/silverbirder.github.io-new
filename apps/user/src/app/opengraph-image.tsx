import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    new URL("../../public/assets/logo.png", import.meta.url),
  );
  const logoBase64 = `data:image/png;base64,${logo.toString("base64")}`;

  const notebookLineHeightPx = 48;
  const notebookLineColor = "#e2e8f0";
  const notebookPaperColor = "#ffffff";
  const notebookBorderColor = "#cbd5e1";
  const notebookMarginLineColor = "#fca5a5";

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
            gap: 56,
            marginLeft: 24,
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#f8fafc",
              border: `1px solid ${notebookBorderColor}`,
              display: "flex",
              height: 220,
              justifyContent: "center",
              width: 220,
            }}
          >
            <img
              alt="silverbirder"
              height={160}
              src={logoBase64}
              style={{ objectFit: "contain" }}
              width={160}
            />
          </div>

          <div
            style={{
              color: "#0f172a",
              display: "flex",
              flexDirection: "column",
              letterSpacing: "-0.02em",
              lineHeight: `${notebookLineHeightPx}px`,
            }}
          >
            <span style={{ fontSize: 80, fontWeight: 800 }}>silverbirder</span>
            <span
              style={{
                color: "#475569",
                fontSize: 32,
                fontWeight: 500,
              }}
            >
              personal notes for web engineers
            </span>
          </div>
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
          <span>notes / web / engineering</span>
        </div>
      </div>
    </div>,
    size,
  );
}
