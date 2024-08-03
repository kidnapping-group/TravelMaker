import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    screens: {
      pc: "1200px",
      tablet: "768px",
    },
    colors: {
      black: "#1B1B1B",
      white: "#FFFFFF",
      primary: {
        50: "#EFF6FF",
        100: "#DBEAFE",
        200: "#BFDBFE",
        300: "#93C5FD",
        400: "#60A5FA",
        500: "#3B82F6",
        600: "#2563EB",
        700: "#1D4ED8",
        800: "#1E40AF",
        900: "#1E3A8A",
      },
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
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
