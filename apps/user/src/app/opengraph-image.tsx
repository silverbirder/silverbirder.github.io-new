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

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1020 100%)",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 48,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderRadius: 48,
            display: "flex",
            height: 260,
            justifyContent: "center",
            width: 260,
          }}
        >
          <img
            alt="silverbirder"
            height={180}
            src={logoBase64}
            style={{ objectFit: "contain" }}
            width={180}
          />
        </div>
        <div
          style={{
            color: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          <span>silverbirder</span>
          <span style={{ fontSize: 32, fontWeight: 500, opacity: 0.75 }}>
            personal notes for web engineers
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
