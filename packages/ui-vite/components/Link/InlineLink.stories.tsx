import type { Meta, StoryObj } from "@storybook/react";

import { InlineLink } from "./InlineLink";
import { Text } from "../Text/Text";

const meta = {
  title: "UI/InlineLink",
  component: InlineLink,
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline_Link: Story = {
  render: (args) => (
    <div>
      <Text as="p" size="sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit nemo ullam
        sequi illum quam,{" "}
        <InlineLink
          textSize={"sm"}
          anchor={({ children }) => (
            <a href="https://google.com" target="_blank">
              {children}
            </a>
          )}
        >
          this is another link
        </InlineLink>{" "}
        velit sed quis, corporis alias accusantium? Laborum quod esse nisi sunt
        modi tenetur neque.
      </Text>
    </div>
  ),
};
