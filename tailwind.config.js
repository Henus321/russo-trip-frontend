/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-color-alt": "var(--primary-color-alt)",
        "secondary-color": "var(--secondary-color)",
        "secondary-color-alt": "var(--secondary-color-alt)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoSlab: ["Roboto Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
};
