import { colors } from "../tokens/tw/colors";
import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      primary: ["Inter", ...defaultTheme.fontFamily.sans],
      accent: ["Fake Receipt", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors,
    },
  },
  plugins: [],
};
