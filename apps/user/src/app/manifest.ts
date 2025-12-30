import type { MetadataRoute } from "next";

import { buildSitePath } from "@/libs";

import { iconSizes } from "./icon";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "@silverbirderのジブンノート",
    display: "standalone",
    icons: iconSizes.map((size) => ({
      sizes: `${size}x${size}`,
      src: buildSitePath(`icon/${size}`),
      type: "image/png",
    })),
    name: "silverbirder",
    scope: buildSitePath("/"),
    short_name: "silverbirder",
    start_url: buildSitePath("/"),
    theme_color: "#0f172a",
  };
}
