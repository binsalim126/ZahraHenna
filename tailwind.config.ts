import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        henna: {
          DEFAULT: "#5A2E1A", // Primary Henna Brown
          dark: "#241107",    // Deep Mehndi Dark
          light: "#7A4228",
        },
        moringa: {
          DEFAULT: "#4F7828", // Refined Moringa Leaf Green
          soft: "#9BBF6F",    // Soft Leaf Green
          dark: "#3B5C1B",
        },
        cream: {
          DEFAULT: "#FAF5ED", // Soothing Warm Cream
          soft: "#FFFCF7",
          dark: "#F0E7D8",
        },
        sand: {
          DEFAULT: "#C58343", // Warm Sand / Caramel Accent
          light: "#DE9F62",
          dark: "#9E6126",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        shimmer: "shimmer 2s infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(90, 46, 26, 0.08), 0 4px 12px -2px rgba(90, 46, 26, 0.04)",
        "luxury-hover": "0 20px 40px -10px rgba(90, 46, 26, 0.15), 0 8px 20px -4px rgba(90, 46, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
