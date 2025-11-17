/** @type {import('tailwindcss').Config} */

const { COLORS } = require("./src/constants/styles");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: COLORS,
    },
  },
  plugins: [],
};
