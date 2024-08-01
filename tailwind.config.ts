import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      pc: "1200px",
      tablet: "768px",
    },
    colors: {
      black: "#1B1B1B",
      "nomad-black": "#323236",
      gray: {
        800: "#484848",
        700: "#79747E",
        600: "#A4A1AA",
        500: "#ADAE88",
        400: "#CBC9CF",
        300: "#DDDDDD",
        200: "#EEEEEE",
        100: "#FAFAFA",
      },
      green: {
        DEFAULT: "#0B332D",
        light: "#F1FFFD",
        bright: "#00A007",
      },
      red: {
        DEFAULT: "#FF472E",
        light: "#FFF4E8",
      },
      orange: {
        DEFAULT: "#FF7D1D",
        light: "#FFF4E8",
      },
      yellow: "#FFC23D",
      blue: {
        DEFAULT: "#0086FF",
        light: "#42E8FF",
        lighter: "#12FBFF",
      },
    },
    fontSize: {
      xs: ["12px", "18px"],
      sm: ["13px", "22px"],
      md: ["14px", "24px"],
      lg: ["16px", "26px"],
      "2lg": ["18px", "26px"],
      xl: ["20px", "32px"],
      "2xl": ["24px", "32px"],
      "3xl": ["32px", "42px"],
    },
  },
};
export default config;
