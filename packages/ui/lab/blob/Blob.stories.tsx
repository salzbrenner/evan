import type { Meta, StoryObj } from "@storybook/react";

import { Blob } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Lab/Blob",
  component: Blob,
  tags: ["autodocs"],
} satisfies Meta<typeof Blob>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Glassy_Blob: Story = {
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <Blob {...args} />
    </div>
  ),
};
