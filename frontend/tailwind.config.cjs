/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-25': '#FEFEFF',
        'gray-850': '#2A3340',
      },
      screens: {
        sm: '400px',
        md: '640px',
        lg: '1024px',
        print: { raw: 'print' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
