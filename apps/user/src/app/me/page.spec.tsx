import { Me } from "@repo/user-feature-me";
import { isValidElement } from "react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("MePage", () => {
  it("renders the me feature entry", () => {
    const element = Page();

    expect(isValidElement(element)).toBe(true);
    expect(element.type).toBe(Me);
  });
});
