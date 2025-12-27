import process from "node:process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES_BASE_PATH || "",
  assetPrefix: process.env.GITHUB_PAGES_BASE_PATH || "",
};

export default nextConfig;
