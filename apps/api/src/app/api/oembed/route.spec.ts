import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const originalFetch = globalThis.fetch;

const createRequest = (url: string) => new NextRequest(url);

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("oembed api", () => {
  it("returns 400 for invalid url", async () => {
    const request = createRequest("http://localhost/api/oembed?url=not-a-url");

    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ error: "Invalid url" });
  });

  it("returns oembed html when provider responds", async () => {
    globalThis.fetch = vi.fn(async (input) => {
      const url = typeof input === "string" ? input : input.url;
      if (url.startsWith("https://noembed.com/embed")) {
        return new Response(JSON.stringify({ html: "<div>oembed</div>" }), {
          headers: { "content-type": "application/json" },
          status: 200,
        });
      }
      throw new Error(`Unexpected fetch ${url}`);
    }) as typeof fetch;

    const request = createRequest(
      "http://localhost/api/oembed?url=https%3A%2F%2Fexample.com",
    );

    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      html: "<div>oembed</div>",
      type: "oembed",
      url: "https://example.com",
    });
  });

  it("falls back to link preview metadata when oembed is unavailable", async () => {
    globalThis.fetch = vi.fn(async (input) => {
      const url = typeof input === "string" ? input : input.url;
      if (url.startsWith("https://noembed.com/embed")) {
        return new Response(JSON.stringify({ error: "not found" }), {
          headers: { "content-type": "application/json" },
          status: 200,
        });
      }

      return new Response(
        [
          "<html><head>",
          "<title>Example Title</title>",
          '<meta property="og:description" content="Example description" />',
          '<meta property="og:image" content="/image.png" />',
          '<link rel="icon" href="/favicon.ico" />',
          "</head><body></body></html>",
        ].join(""),
        {
          headers: { "content-type": "text/html; charset=utf-8" },
          status: 200,
        },
      );
    }) as typeof fetch;

    const request = createRequest(
      "http://localhost/api/oembed?url=https%3A%2F%2Fexample.com",
    );

    const response = await GET(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      hostname: "example.com",
      title: "Example Title",
      type: "link",
      url: "https://example.com",
    });
  });
});
