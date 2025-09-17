
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        ruigslay: ["var(--font-ruigslay)", "sans-serif"],
        nostromo: ["var(--font-nostromo-medium)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        gulimche: ["var(--font-gulimche)", "sans-serif"],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      minHeight: {
        'screen-small': 'calc(100vh - 40px)',
      },
      fontSize: {
        'clamp-hero': 'clamp(2.5rem, 8vw, 10rem)',
        'clamp-lg': 'clamp(1.125rem, 2.5vw, 1.5rem)',
        'clamp-base': 'clamp(0.875rem, 2vw, 1rem)',
        'clamp-sm': 'clamp(0.75rem, 1.5vw, 0.875rem)',

      },
    },
  },
  plugins: [],
};