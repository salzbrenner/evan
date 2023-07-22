import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Lab/Field",
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const _Field: Story = {
  render: (args) => (
    <div style={{ height: "218px", width: "218px", border: "solid 1px blue" }}>
      <Field {...args} />
    </div>
  ),
};
