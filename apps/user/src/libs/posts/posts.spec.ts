import { describe, expect, it } from "vitest";

import { getPostSlugs } from ".";

describe("getPostSlugs", () => {
  it("returns slugs for markdown files in the blog contents directory", async () => {
    const slugs = await getPostSlugs();

    expect(slugs).toContain("20251027");
  });
});
