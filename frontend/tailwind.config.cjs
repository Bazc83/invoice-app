/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
          'btn-default': 'var(--color-button-default)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
          'btn-default': 'var(--color-button-default)',
          navbar: 'var(--color-navbar)',
        },
      },
      borderColor: {
        skin: {
          fill: 'var(--color-fill)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
          'btn-default': 'var(--color-button-default)',
        },
      },
      ringColor: {
        skin: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          base: 'var(--color-ring-base)',
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
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('@tailwindcss/forms')],
};
