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
  ],
  theme: {
    spacing: generateSpacing(),
    colors: {
      "danger": "var(--aura-accents-danger)",
      "success": "var(--aura-accents-primary)",
      "info": "var(--aura-accents-info`)",
      "accents-0": "var(--aura-accents-0)",
      "accents-1": "var(--aura-accents-1)",
      "accents-2": "var(--aura-accents-2)",
      "accents-3": "var(--aura-accents-3)",
      "accents-4": "var(--aura-accents-4)",
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
