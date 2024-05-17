import type { Config as DaisyConfig } from "daisyui";
import type { Config as TailwindConfig } from "tailwindcss";

const daisyuiConfig: DaisyConfig = {
  darkTheme: "night",
  themes: [
    // {
    //   spinspot: {
    //     primary: "#02415a",
    //     secondary: "#6f3a82",
    //     accent: "#5b2bca",
    //     neutral: "#427AA1",
    //     "base-100": "#EBF2FA",
    //     info: "#53a6ea",
    //     success: "#0bad1e",
    //     warning: "#ff9900",
    //     error: "#d92020",
    //   },
    // },
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
};

const config: TailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: daisyuiConfig,
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
