import type { ReactNode } from "react";

import React, { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@repo/ui", () => ({
  Provider: ({ children }: { children: ReactNode }) =>
    React.createElement("div", { "data-provider": "ui" }, children),
}));

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: ReactNode }) =>
    React.createElement("div", { "data-provider": "intl" }, children),
}));

const getMessages = vi.fn().mockResolvedValue({});

vi.mock("next-intl/server", () => ({
  getMessages,
}));

vi.mock("next/font/google", () => ({
  Noto_Sans_JP: () => ({ className: "noto-font" }),
}));

describe("RootLayout", () => {
  it("wraps children with intl provider and applies html and body attributes", async () => {
    const mod = await import("./layout");

    const ui = await import("@repo/ui");
    const nextIntl = await import("next-intl");

    const element = await mod.default({
      children: React.createElement("span", null, "child"),
    });

    expect(getMessages).toHaveBeenCalledTimes(1);
    expect(isValidElement(element)).toBe(true);
    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("ja");

    const bodyElement = element.props.children;

    expect(bodyElement.type).toBe("body");
    expect(bodyElement.props.className).toBe("noto-font");

    const uiProviderElement = bodyElement.props.children;

    expect(uiProviderElement.type).toBe(ui.Provider);

    const intlProviderElement = uiProviderElement.props.children;

    expect(intlProviderElement.type).toBe(nextIntl.NextIntlClientProvider);

    const viewTransitionElement = intlProviderElement.props.children;

    expect(isValidElement(viewTransitionElement)).toBe(true);
    expect(viewTransitionElement.props.children.type).toBe("span");
  });
});
