import { Config as DaisyConfig } from "daisyui";
import { Config as TailwindConfig } from "tailwindcss";

const config: TailwindConfig = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: <DaisyConfig>{
    themes: [
      {
        spinspot: {
          primary: "#02415a",
          secondary: "#6f3a82",
          accent: "#5b2bca",
          neutral: "#427aa1",
          "base-100": "#ebf2fa",
          info: "#53a6ea",
          success: "#0bad1e",
          warning: "#ff9900",
          error: "#d92020",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
