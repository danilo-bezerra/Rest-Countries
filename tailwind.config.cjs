/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};
