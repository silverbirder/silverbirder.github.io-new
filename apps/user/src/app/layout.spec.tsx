import type { ReactNode } from "react";

import React, { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

describe("RootLayout", () => {
  it("wraps children with intl provider and applies html and body attributes", async () => {
    vi.resetModules();

    const getMessages = vi.fn().mockResolvedValue({});

    vi.doMock("@repo/ui", () => ({
      Provider: ({ children }: { children: ReactNode }) =>
        React.createElement("div", { "data-provider": "ui" }, children),
    }));

    vi.doMock("next-intl", () => ({
      NextIntlClientProvider: ({ children }: { children: ReactNode }) => (
        <div data-provider="intl">{children}</div>
      ),
    }));

    vi.doMock("next-intl/server", () => ({
      getMessages,
    }));

    vi.doMock("next/font/google", () => ({
      Noto_Sans_JP: () => ({ className: "noto-font" }),
    }));

    const mod = await import("./layout");
    const element = await mod.default({ children: <span>child</span> });

    expect(getMessages).toHaveBeenCalledTimes(1);
    expect(isValidElement(element)).toBe(true);
    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("ja");

    const bodyElement = element.props.children;

    expect(bodyElement.type).toBe("body");
    expect(bodyElement.props.className).toBe("noto-font");

    const uiProviderElement = bodyElement.props.children;

    expect(uiProviderElement.type).toBe("div");
    expect(uiProviderElement.props["data-provider"]).toBe("ui");

    const intlProviderElement = uiProviderElement.props.children;

    expect(intlProviderElement.type).toBe("div");
    expect(intlProviderElement.props["data-provider"]).toBe("intl");

    const viewTransitionElement = intlProviderElement.props.children;

    expect(isValidElement(viewTransitionElement)).toBe(true);
    expect(viewTransitionElement.props.children.type).toBe("span");
  });
});
