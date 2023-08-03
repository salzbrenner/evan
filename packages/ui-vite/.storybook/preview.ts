import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-styling";
// import "../css/tokens";
import "../../tokens/css/text.css";
import "../../tokens/css/theme.css";
import "../../tokens/css/lightTheme.css";
import "../css/tailwind.css";
import "../css/global.css";

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
    attributeName: "class",
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
