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
        nostromo: ["var(--font-nostromo)", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
