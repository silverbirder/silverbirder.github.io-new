import { describe, expect, it } from "vitest";

import { renderWithProvider } from "../test-util";
import { NotebookPostItem } from "./notebook-post-item";

describe("NotebookPostItem", () => {
  it("renders summary variant with meta and tags", async () => {
    const { container } = await renderWithProvider(
      <NotebookPostItem
        metaSeparator="/"
        post={{
          publishedAt: "2025-01-03",
          slug: "notebook-post",
          summary: "Notebook summary",
          tags: ["Notebook", "UI"],
          title: "Notebook Post",
        }}
      />,
    );

    expect(container.textContent ?? "").toContain("Notebook Post");
    expect(container.textContent ?? "").toContain("Notebook summary");
    expect(container.textContent ?? "").toContain("2025-01-03");
    expect(container.textContent ?? "").toContain("/");
    expect(container.textContent ?? "").toContain("Notebook");
    expect(container.textContent ?? "").toContain("UI");
  });

  it("renders when summary is missing (shows title and publishedAt)", async () => {
    const { container } = await renderWithProvider(
      <NotebookPostItem
        post={{
          publishedAt: "2025-01-03",
          slug: "related-post",
          summary: "",
          tags: [],
          title: "Related Post",
        }}
      />,
    );

    expect(container.textContent ?? "").toContain("Related Post");
    expect(container.textContent ?? "").toContain("2025-01-03");
  });
});
