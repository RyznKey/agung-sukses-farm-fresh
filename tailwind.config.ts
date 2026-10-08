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
        // Primary palette
        primary: {
          green: '#28a745', // default green
          red: '#dc2626', // default red
          dark: '#1f2937', // default dark
          light: '#f3f4f6', // default light
        },
        // Secondary palette
        secondary: {
          yellow: '#fbbf24', // default yellow
        },
        // Brand specific colors
        brand: {
          dark: '#0f172a',
          red: '#b91c1c',
        },
        // Retain any custom farm colors if still needed elsewhere
        farm: {
          green: "#103C23",
          yellow: "#F5A623",
          dark: "#1F2937",
          light: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"], // Sesuai dengan gaya elegan di gambar pertama
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
