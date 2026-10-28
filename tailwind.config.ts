import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: "#104B78",
            50: "#F0F6FA",
            100: "#DDEAF3",
            200: "#B8D4E6",
            300: "#8BBad5",
            400: "#5496BF",
            500: "#2B7BAA",
            600: "#186392",
            700: "#104B78", // Official Navy Blue
            800: "#0D3D61",
            900: "#0B314F",
            950: "#061D30",
          },
          red: {
            DEFAULT: "#E44236",
            50: "#FEF2F2",
            100: "#FDE3E1",
            200: "#FCCBC7",
            300: "#F9A49E",
            400: "#F37269",
            500: "#E44236", // Official Red
            600: "#CD2D21",
            700: "#AB2319",
            800: "#8D211A",
            900: "#75211B",
            950: "#400D09",
          },
          grey: {
            DEFAULT: "#F5F7FA",
            50: "#FAFBFC",
            100: "#F5F7FA", // Official Light Grey
            200: "#E9ECF2",
            300: "#D7DCE5",
            400: "#A9B3C4",
            500: "#7F8BA0",
            600: "#5B667C",
            700: "#444D5E",
            800: "#2D3441",
            900: "#191E27",
            950: "#0F1218",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(16, 75, 120, 0.08)",
        "soft-lg": "0 10px 30px -3px rgba(16, 75, 120, 0.12)",
        "red-glow": "0 4px 20px -2px rgba(228, 66, 54, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;

