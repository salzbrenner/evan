import type { Meta, StoryObj } from "@storybook/react";

import { ArrowLink } from "./ArrowLink";
import { Text } from "../Text/Text";

const meta = {
  title: "UI/ArrowLink",
  component: ArrowLink,
} satisfies Meta<typeof ArrowLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrow_Link: Story = {
  render: (args) => (
    <div>
      <ArrowLink
        textSize={"sm"}
        display={"block"}
        anchor={({ children }) => (
          <a href="https://google.com" target="_blank">
            {children}
          </a>
        )}
      >
        This is a link
      </ArrowLink>
      <ArrowLink
        display={"block"}
        anchor={({ children }) => (
          <a href="https://google.com" target="_blank">
            {children}
          </a>
        )}
      >
        This is another link
      </ArrowLink>
      <Text as="p" size="sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit nemo ullam
        sequi illum quam,{" "}
        <ArrowLink
          textSize={"sm"}
          anchor={({ children }) => (
            <a href="https://google.com" target="_blank">
              {children}
            </a>
          )}
        >
          this is another link
        </ArrowLink>{" "}
        velit sed quis, corporis alias accusantium? Laborum quod esse nisi sunt
        modi tenetur neque.
      </Text>
    </div>
  ),
};
