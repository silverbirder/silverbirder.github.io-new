import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostEditorLayout } from "./post-editor-layout";

const meta = {
  args: {
    bodyValue: "## Highlights\n\n- Clear structure\n- Short sections",
    onBodyChange: () => undefined,
    onTitleChange: () => undefined,
    previewState: {
      content: (
        <>
          <h2>Highlights</h2>
          <ul>
            <li>Clear structure</li>
            <li>Short sections</li>
          </ul>
        </>
      ),
      status: "ready",
    },
    titleValue: "Release notes",
  },
  component: PostEditorLayout,
  title: "UI/Domain/PostEditorLayout",
} satisfies Meta<typeof PostEditorLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ideal: Story = {};

export const Empty: Story = {
  args: {
    bodyValue: "",
    previewState: {
      status: "empty",
    },
    titleValue: "",
  },
};

export const Error: Story = {
  args: {
    previewState: {
      status: "error",
    },
  },
};

export const Partial: Story = {
  args: {
    bodyValue: "",
    previewState: {
      status: "empty",
    },
    titleValue: "Draft in progress",
  },
};

export const Loading: Story = {
  args: {
    previewState: {
      status: "loading",
    },
  },
};
