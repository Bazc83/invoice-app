/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
        },
      },
      ringColor: {
        skin: {
          base: 'var(--ring-base)',
          danger: 'var(--color-danger)',
          warning: 'var(--color-warning)',
          success: 'var(--color-success)',
        },
      },
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
  plugins: [require('@tailwindcss/forms')],
};
