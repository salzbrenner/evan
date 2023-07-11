import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Text/Accent",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const COPY = "The quick brown fox jumps over the lazy dog";

export const AccentXSmall: Story = {
  args: {
    accent: true,
    children: COPY,
    size: "xs",
  },
};

export const AccentSmall: Story = {
  args: {
    accent: true,
    children: COPY,
    size: "sm",
  },
};

export const Accent: Story = {
  args: {
    accent: true,
    children: COPY,
  },
};

export const AccentLarge: Story = {
  args: {
    accent: true,
    children: COPY,
    size: "lg",
  },
};
