/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '400px',
        md: '640px',
        lg: '1024px',
        print: { raw: 'print' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
