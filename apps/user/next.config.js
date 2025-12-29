import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import process from "node:process";

/** @type {import('next').NextConfig} */
const config = {
  assetPrefix: process.env.GITHUB_PAGES_BASE_PATH || "",
  basePath: process.env.GITHUB_PAGES_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
  output: "export",
  reactCompiler: true,
  trailingSlash: true,
  typedRoutes: true,
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
  },
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(withMDX(config));
