import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
  staticDirs: ["../public"],
  stories: [
    "../components/**/**/*.mdx",
    "../components/**/**/*.stories.@(ts|tsx)",
    "../lab/**/**/*.stories.@(ts|tsx)",
    "../lab/**/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
