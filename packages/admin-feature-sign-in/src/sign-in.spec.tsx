import { jaMessages } from "@repo/message";
import { composeStories } from "@storybook/nextjs-vite";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { SignIn } from "./sign-in";
import * as stories from "./sign-in.stories";

const Stories = composeStories(stories);

describe("SignIn", () => {
  it.each(Object.entries(Stories))("renders %s", async (_, Story) => {
    const originalInnerHtml = document.body.innerHTML;

    await Story.run();

    await expect(document.body).toMatchScreenshot();

    document.body.innerHTML = originalInnerHtml;
  });

  it("shows the error message when provided", async () => {
    await render(<SignIn status="forbidden" />);

    const alert = document.querySelector("[role='alert']");
    expect(alert?.textContent ?? "").not.toBe("");
  });

  it("renders the sign-out action when onSignOut is provided", async () => {
    await render(<SignIn onSignOut={async () => {}} />);

    const buttons = Array.from(document.querySelectorAll("button"));
    const hasSignOut = buttons.some(
      (node) => (node.textContent ?? "") === jaMessages.admin.signIn.signOut,
    );
    expect(hasSignOut).toBe(true);
  });
});
