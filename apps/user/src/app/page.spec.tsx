import { isValidElement } from "react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("Page", () => {
  it("renders the hello world message", () => {
    const element = Page();

    expect(isValidElement(element)).toBe(true);
  });
});
