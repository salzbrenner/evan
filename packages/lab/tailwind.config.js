const config = require("../shared/tailwind.config");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ["./src/**/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
