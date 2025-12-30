import { afterEach, describe, expect, it } from "vitest";

import manifest from "./manifest";

const originalBasePath = process.env.GITHUB_PAGES_BASE_PATH;

const restoreEnv = () => {
  if (originalBasePath === undefined) {
    delete process.env.GITHUB_PAGES_BASE_PATH;
  } else {
    process.env.GITHUB_PAGES_BASE_PATH = originalBasePath;
  }
};

afterEach(() => {
  restoreEnv();
});

describe("manifest", () => {
  it("scopes the manifest paths to the base path", () => {
    process.env.GITHUB_PAGES_BASE_PATH = "/docs";

    const result = manifest();

    expect(result.start_url).toBe("/docs/");
    expect(result.scope).toBe("/docs/");
    expect(result.icons).toEqual([
      {
        sizes: "32x32",
        src: "/docs/icon",
        type: "image/png",
      },
      {
        sizes: "180x180",
        src: "/docs/apple-icon",
        type: "image/png",
      },
    ]);
  });
});
