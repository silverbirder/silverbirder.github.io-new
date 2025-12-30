import { afterEach, describe, expect, it, vi } from "vitest";

const ImageResponse = vi.fn().mockImplementation(function (...args) {
  return { args };
});

const readFile = vi.fn();

vi.mock("node:fs/promises", () => ({
  readFile,
}));

vi.mock("next/og", () => ({
  ImageResponse,
}));

import OpenGraphImage, { contentType, size } from "./opengraph-image";

afterEach(() => {
  vi.clearAllMocks();
});

describe("opengraph-image", () => {
  it("builds a png image response", async () => {
    readFile.mockResolvedValue(Buffer.from([1, 2, 3]));

    const result = await OpenGraphImage();

    expect(contentType).toBe("image/png");
    expect(size).toEqual({ height: 630, width: 1200 });
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(String(readFile.mock.calls[0]?.[0])).toContain(
      "/public/assets/logo.png",
    );
    expect(ImageResponse).toHaveBeenCalledWith(expect.anything(), size);
    expect(result).toEqual({ args: [expect.anything(), size] });
  });
});
