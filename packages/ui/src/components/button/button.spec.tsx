import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "./button";

describe("Button", () => {
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
