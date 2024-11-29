/** @type {import('tailwindcss').Config} */
// watching ui package
const config = require('../shared/tailwind.config');
module.exports = {
  ...config,
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
    },
  },
  content: ['../ui/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
};
