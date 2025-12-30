import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = { height: 32, width: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(
    new URL("../../public/assets/logo.png", import.meta.url),
  );
  const logoBase64 = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <img
        alt="silverbirder"
        height={24}
        src={logoBase64}
        style={{ objectFit: "contain" }}
        width={24}
      />
    </div>,
    size,
  );
}
