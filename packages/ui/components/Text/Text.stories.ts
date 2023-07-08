import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Text/Primary",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const COPY = "The quick brown fox jumps over the lazy dog";

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryXSmall: Story = {
  args: {
    children: COPY,
    size: "xs",
  },
};

export const PrimarySmall: Story = {
  args: {
    children: COPY,
    size: "sm",
  },
};

export const PrimarySmallStrong: Story = {
  args: {
    children: COPY,
    size: "sm",
    strong: true,
  },
};

export const Primary: Story = {
  args: {
    children: COPY,
  },
};

export const PrimaryStrong: Story = {
  args: {
    children: COPY,
    strong: true,
  },
};

export const PrimaryLarge: Story = {
  args: {
    children: COPY,
    size: "lg",
  },
};

export const PrimaryLargeStrong: Story = {
  args: {
    children: COPY,
    size: "lg",
    strong: true,
  },
};
