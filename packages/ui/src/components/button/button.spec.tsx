import { describe, expect, it, vi } from "vitest";
import { composeStories } from "@storybook/nextjs-vite";
import { render } from "vitest-browser-react";
import * as stories from "./button.stories";
import { Button } from "./button";

const Stories = composeStories(stories);

describe("Button", () => {
  it.each(Object.entries(Stories))("should %s snapshot", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("renders and fires the alert on click", async () => {
    const appName = "TestApp";
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await render(
      <Button appName={appName} className="test-class">
        Click Me
      </Button>,
    );

    const buttonElement = document.querySelector("button");
    expect(buttonElement).not.toBeNull();
    expect(buttonElement).toHaveClass("test-class");
    expect(buttonElement).toHaveTextContent("Click Me");

    buttonElement?.click();
    expect(alertSpy).toHaveBeenCalledWith(`Hello from your ${appName} app!`);

    alertSpy.mockRestore();
  });
});
