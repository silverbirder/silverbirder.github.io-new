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

import Icon, { contentType, size } from "./icon";

afterEach(() => {
  vi.clearAllMocks();
});

describe("icon", () => {
  it("builds a png icon response", async () => {
    readFile.mockResolvedValue(Buffer.from([1, 2, 3]));

    const result = await Icon();

    expect(contentType).toBe("image/png");
    expect(size).toEqual({ height: 32, width: 32 });
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(String(readFile.mock.calls[0]?.[0])).toContain(
      "/public/assets/logo.png",
    );
    expect(ImageResponse).toHaveBeenCalledWith(expect.anything(), size);
    expect(result).toEqual({ args: [expect.anything(), size] });
  });
});
