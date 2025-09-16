/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ruigslay: ["var(--font-ruigslay)", "sans-serif"],
        nostromo: ["var(--font-nostromo-medium)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        gulimche: ["var(--font-gulimche)", "sans-serif"],
      },
    },
  },
  plugins: [],
};