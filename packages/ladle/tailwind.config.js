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
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: "767px",
      // => @media (min-width: 767px) { ... }
      lg: "1155px",
      // => @media (min-width: 1155px) { ... }
    },
    spacing: generateSpacing(),
    extend: {
      colors: {
        "accents-danger": "var(--aura-accents-danger)",
        "accents-primary": "var(--aura-accents-success)",
        "accents-success": "var(--aura-accents-primary)",
        "accents-info": "var(--aura-accents-info`)",
        "accents-0": "var(--aura-accents-0)",
        "accents-1": "var(--aura-accents-1)",
        "accents-2": "var(--aura-accents-2)",
        "accents-3": "var(--aura-accents-3)",
        "accents-4": "var(--aura-accents-4)",
        "accents-10": "var(--aura-accents-10)",
        snow: "var(--aura-snow)",
      },
    },
  },
  plugins: [],
};
