import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const contentType = "image/png";

export const iconSizes = [32, 48, 72, 96, 144, 192, 512] as const;

type Props = {
  id: number | string;
};

export function generateImageMetadata() {
  return iconSizes.map((size) => ({
    contentType,
    id: size,
    size: { height: size, width: size },
  }));
}

export default async function Icon({ id }: Props) {
  const size = typeof id === "number" ? id : Number(id);
  const resolvedSize = Number.isFinite(size) ? size : iconSizes[0];
  const logoSize = Math.max(1, Math.round(resolvedSize * 0.75));

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
        height={logoSize}
        src={logoBase64}
        style={{ objectFit: "contain" }}
        width={logoSize}
      />
    </div>,
    {
      height: resolvedSize,
      width: resolvedSize,
    },
  );
}
