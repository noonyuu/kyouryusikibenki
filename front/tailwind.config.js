/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#306CFE",
        black: "#141414",
        purple: "#48319D",
        lightPurple: "#48319D",
        "gradation-s": "#1C1B33",
        "gradation-e": "#2E335A",

        lightBlue: "#1D9BF0",
      },
      fontFamily: {
        sans: ["Potta One", "Yusei Magic"],
      },
      backgroundImage: {
        "main-back": "url('/src/assets/ba')",
      },
    },
  },
  plugins: [],
};
