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
          "primary-content": "#ffffff",
          secondary: "#6f3a82",
          "secondary-content": "#ffffff",
          accent: "#5b2bca",
          "accent-content": "#ffffff",
          neutral: "#427aa1",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#EBF2FA",
          "base-300": "#c0c6ce",
          info: "#53a6ea",
          success: "#0bad1e",
          warning: "#ff9900",
          error: "#d92020",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
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
