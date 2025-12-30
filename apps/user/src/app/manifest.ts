import type { MetadataRoute } from "next";

import { buildSitePath } from "@/libs";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "@silverbirderのジブンノート",
    display: "standalone",
    icons: [
      {
        sizes: "32x32",
        src: buildSitePath("icon"),
        type: "image/png",
      },
      {
        sizes: "180x180",
        src: buildSitePath("apple-icon"),
        type: "image/png",
      },
    ],
    name: "silverbirder",
    scope: buildSitePath("/"),
    short_name: "silverbirder",
    start_url: buildSitePath("/"),
    theme_color: "#0f172a",
  };
}
