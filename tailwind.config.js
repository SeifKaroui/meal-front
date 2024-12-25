/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/preline/preline.js"],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
};
