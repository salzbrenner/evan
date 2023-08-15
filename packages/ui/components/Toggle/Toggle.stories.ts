import type { Meta, StoryObj } from "@storybook/react";

import { Toggle as TC } from "./Toggle";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "UI/Toggle",
  component: TC,
  // tags: ["autodocs"],
} satisfies Meta<typeof TC>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Toggle_Default: Story = {
  args: {
    label: "Toggle",
    id: "toggle1",
  },
};

export const Toggle_Small: Story = {
  args: {
    label: "Toggle",
    id: "toggle2",
    size: "sm",
    horizontal: false,
  },
};

export const Toggle_Horizontal: Story = {
  args: {
    label: "Toggle",
    id: "toggle1",
    horizontal: true,
  },
};
