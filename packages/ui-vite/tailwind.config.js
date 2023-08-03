const config = require("../shared/tailwind.config");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ["./components/**/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
};
