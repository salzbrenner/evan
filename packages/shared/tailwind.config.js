import { color } from "../tokens/tw/colors";
import { font } from "../tokens/tw/fonts";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    // font shorthand
    font: {
      // fonts pointing to the css variables
      // i.e. "font-primary", "font-primary-lg", "font-accent-sm"
      ...font,
    },
    fontFamily: {
      primary: ["Inter", ...defaultTheme.fontFamily.sans],
      accent: ["Fake Receipt", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      // colors pointing to the css variables
      // prefix with "clr-" to avoid conflicts with the default colors
      // i.e. "clr-brand-primary"
      colors: color,
    },
  },
  plugins: [
    // custom font selector to pick up the shorthand font property
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          font: (value) => ({
            font: value,
          }),
        },
        { values: theme("font") }
      );
    }),
  ],
};
