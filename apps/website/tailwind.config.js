/** @type {import('tailwindcss').Config} */

function generateSpacing() {
  const result = {};
  for (let i = 0.5; i <= 50; i += 0.5) {
    result[i] = `${i * 13}px`;
  }
  return { 0: "0px", ...result };
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    spacing: generateSpacing(),
    extend: {
      colors: {
        purple: "#e8ebfe",
        "accents-3": "#dadaeb",
      },
    },
    screens: {
      md: "767px",
      // => @media (min-width: 767px) { ... }
      lg: "1155px",
      // => @media (min-width: 1155px) { ... }
    },
  },
  plugins: [],
};
