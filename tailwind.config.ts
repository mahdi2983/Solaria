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
        solaria: {
          alabaster: "#F9F8F5",
          obsidian: "#0A0A0C",
          travertine: "#F1EFEA",
          travertineDark: "#141417",
          bronze: "#BFA175",
          bronzeLight: "#D9C3A3",
          bronzeDark: "#8E724B",
          basalt: "#16161A",
          basaltLight: "#EDEDF0",
          sand: "#787571",
          sandLight: "#8C8A87",
          hairlineLight: "rgba(22, 22, 26, 0.08)",
          hairlineDark: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cabinet Grotesk", "Syne", "sans-serif"],
        editorial: ["var(--font-editorial)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.32, 0.72, 0, 1)",
        architectural: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      boxShadow: {
        "double-bezel-light": "inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 20px 40px -15px rgba(22, 22, 26, 0.05)",
        "double-bezel-dark": "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 20px 50px -15px rgba(0, 0, 0, 0.5)",
        "bronze-glow": "0 0 35px -5px rgba(191, 161, 117, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
