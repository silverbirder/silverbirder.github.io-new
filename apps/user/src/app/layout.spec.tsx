import type { ReactNode } from "react";

import { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

const getMessages = vi.fn().mockResolvedValue({});

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => (
    <div data-provider="intl">{children}</div>
  ),
}));

vi.mock("next-intl/server", () => ({
  getMessages,
}));

vi.mock("next/font/google", () => ({
  Noto_Sans_JP: () => ({ className: "noto-font" }),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("wraps children with intl provider and applies html and body attributes", async () => {
    const element = await RootLayout({ children: <span>child</span> });

    expect(getMessages).toHaveBeenCalledTimes(1);
    expect(isValidElement(element)).toBe(true);
    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("ja");

    const bodyElement = element.props.children;

    expect(bodyElement.type).toBe("body");
    expect(bodyElement.props.className).toBe("noto-font");

    const providerElement = bodyElement.props.children;

    expect(providerElement.type).toBe("div");
    expect(providerElement.props["data-provider"]).toBe("intl");
    expect(providerElement.props.children.type).toBe("span");
  });
});
