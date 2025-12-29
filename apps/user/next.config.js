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

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(config);
