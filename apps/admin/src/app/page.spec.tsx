import { jaMessages } from "@repo/message";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

type Session = null | { user: SessionUser };

type SessionUser = { email?: string; name?: string };

const renderHome = async (session: Session) => {
  vi.resetModules();

  vi.doMock("@/server/better-auth/server", () => ({
    getSession: vi.fn().mockResolvedValue(session),
  }));

  vi.doMock("@/server/better-auth", () => ({
    auth: {
      api: {
        signOut: vi.fn(),
      },
    },
  }));

  vi.doMock("@/trpc/server", () => ({
    HydrateClient: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  }));

  vi.doMock("next/headers", () => ({
    headers: vi.fn().mockResolvedValue(new Headers()),
  }));

  vi.doMock("next/navigation", () => ({
    redirect: vi.fn(),
  }));

  const mod = await import("./page");
  const element = await mod.default();
  return renderToStaticMarkup(element);
};

describe("Home page", () => {
  it("renders the signed-in message with the user name", async () => {
    const markup = await renderHome({ user: { name: "Sora" } });
    const expected = jaMessages.admin.home.signedInAs.replace("{name}", "Sora");

    expect(markup).toContain(jaMessages.admin.home.title);
    expect(markup).toContain(expected);
    expect(markup).toContain(jaMessages.admin.home.signOut);
  });

  it("falls back to unknown user when name and email are missing", async () => {
    const markup = await renderHome({ user: {} });
    const expected = jaMessages.admin.home.signedInAs.replace(
      "{name}",
      jaMessages.admin.home.unknownUser,
    );

    expect(markup).toContain(expected);
  });
});
