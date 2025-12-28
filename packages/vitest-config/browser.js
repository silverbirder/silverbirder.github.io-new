import { readFileSync } from "node:fs";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import nextjs from "vite-plugin-storybook-nextjs";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

const hasDependency = (packageJson, name) => {
  const buckets = [
    "dependencies",
    "devDependencies",
  ];
  return buckets.some((bucket) => Boolean(packageJson?.[bucket]?.[name]));
};

const usesNext = () => {
  try {
    const raw = readFileSync(join(process.cwd(), "package.json"), "utf8");
    const pkg = JSON.parse(raw);
    return hasDependency(pkg, "next");
  } catch {
    return false;
  }
};

/**
 * Shared Vitest Browser Mode configuration blueprint.
 * @type {import("vitest/config").ViteUserConfigExport}
 */
const baseConfig = {
  plugins: [react(), ...(usesNext() ? [nextjs({ dir: "../../apps/user" })] : [])],
  test: {
    include: ["src/**/*.spec.{ts,tsx}"],
    setupFiles: ["@repo/vitest-config/setup"],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
};

/**
 * Factory helper so packages can extend the shared Browser Mode config.
 * @param {import("vitest/config").ViteUserConfigExport} overrides
 * @returns {import("vitest/config").ViteUserConfigExport}
 */
export const createBrowserConfig = (overrides = {}) =>
  defineConfig(mergeConfig(baseConfig, overrides));

export default defineConfig(baseConfig);
