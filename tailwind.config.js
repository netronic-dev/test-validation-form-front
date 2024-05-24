/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        konnect: ["konnect", "sans-serif"],
        gravity: ["gravity", "sans-serif"],
      },
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1512px",
    },
  },
  plugins: [],
};
