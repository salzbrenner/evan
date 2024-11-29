import { color } from "../tokens/tw/colors";
import { font } from "../tokens/tw/fonts";
import plugin from "tailwindcss/plugin";

const DOT_SIZE = "0.4px";
const DOT_SPACE = "5px";

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
      // primary: ["Inter", ...defaultTheme.fontFamily.sans],
      // accent: ["Fake Receipt", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      // colors pointing to the css variables
      // prefix with "clr-" to avoid conflicts with the default colors
      // i.e. "clr-brand-primary"
      colors: color,
      keyframes: {
        "fade-in-up": {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 200ms ease-in forwards",
      },
    },
  },
  plugins: [
    // custom font selector to pick up the shorthand font property
    plugin(function ({ matchUtilities, theme, addUtilities, addComponents }) {
      matchUtilities(
        {
          font: (value) => ({
            font: value,
          }),
        },
        { values: theme("font") }
      );
      addComponents({
        ".bg-dot": {
          "background-image": `radial-gradient(var(--color-text-primary) ${DOT_SIZE}, transparent 0)`,
          "background-color": "var(--color-ui-accent)",
          "background-size": `${DOT_SPACE} ${DOT_SPACE}`,
        },
        ".light .bg-dot": {
          "background-image": `radial-gradient(var(--color-text-primary) ${DOT_SIZE}, transparent 0)`,
          "background-color": "var(--color-ui-accent)",
          "background-size": `${DOT_SPACE} ${DOT_SPACE}`,
        }
      });
    }),
    plugin(function ({ addUtilities }) {
      const directions = {
        t: "to top",
        tr: "to top right",
        r: "to right",
        br: "to bottom right",
        b: "to bottom",
        bl: "to bottom left",
        l: "to left",
        tl: "to top left",
      };
      const steps = [
        "0%",
        "10%",
        "20%",
        "30%",
        "40%",
        "50%",
        "60%",
        "70%",
        "80%",
        "90%",
      ];
      const utilities = Object.entries(directions).reduce(
        (result, [shorthand, direction]) => {
          const variants = steps.map((step) => {
            const className = `.gradient-mask-${shorthand}-${step}`;
            return {
              [className]: {
                maskImage: `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${step}, transparent 100%)`,
                webkitMaskImage: `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${step}, transparent 100%)`,
              },
            };
          });
          const stepClasses = Object.assign(...variants);
          return {
            ...result,
            ...stepClasses,
          };
        },
        {}
      );
      addUtilities(utilities);
    })
  ],
};
