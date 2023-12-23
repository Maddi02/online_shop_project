/** @type {DefaultColors} */
const colors = require('tailwindcss/colors');
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#131921',
        category: '#232f3e'
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

