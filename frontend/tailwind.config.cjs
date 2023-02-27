/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'rgb(var(--color-text-base) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverted: 'rgb(var(--color-text-inverted) / <alpha-value>)',
          edit: 'rgb(var(--color-edit) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          'btn-default': 'rgb(var(--color-button-default) / <alpha-value>)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'rgb(var(--color-fill) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          edit: 'rgb(var(--color-edit) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          'btn-default': 'rgb(var(--color-button-default) / <alpha-value>)',
          navbar: 'rgb(var(--color-navbar) / <alpha-value>)',
        },
      },
      borderColor: {
        skin: {
          fill: 'rgb(var(--color-fill) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          edit: 'rgb(var(--color-edit) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          'btn-default': 'rgb(var(--color-button-default) / <alpha-value>)',
        },
      },
      ringColor: {
        skin: {
          base: 'rgb(var(--color-ring-base) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
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
