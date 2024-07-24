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
      colors: {},
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
