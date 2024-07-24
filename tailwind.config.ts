import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const createPxRange = (max: number) => {
  const result: { [key: string]: string } = {};
  for (let i = 0; i <= max; i += 1) {
    result[`${i}px`] = `${i}px`;
  }
  return result;
};

const px0_10 = createPxRange(10);
const px0_100 = createPxRange(100);
const px0_200 = createPxRange(200);
const px0_500 = createPxRange(500);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        pc: { min: "1200px" },
        tablet: { min: "768px", max: "1199px" },
      },
      zIndex: {
        dropdown: "1",
        popup: "1",
        modalbackground: "1",
        modalbody: "1",
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      spacing: px0_200,
      borderRadius: px0_100,
      width: px0_500,
      height: px0_500,
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({});
    },
  ],
};
export default config;
