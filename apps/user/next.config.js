import process from "node:process";

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
