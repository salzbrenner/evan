/** @type {import('tailwindcss').Config} */
// watching ui package
const config = require("../shared/tailwind.config");
module.exports = {
  ...config,
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      fontFamily: {
        primary: ["var(--font-inter)"],
        accent: ["var(--font-fake-receipt)"],
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
