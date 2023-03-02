/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: {
            DEFAULT: 'var(--color-text-base)',
          },
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
          secondary: 'var(--color-secondary)',

          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
          button: {
            DEFAULT: 'var(--color-button)',
            darker: 'var(--color-button-darker)',
            lighter: 'var(--color-button-lighter)',
          },
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
          secondary: 'var(--color-secondary)',
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',

          navbar: 'var(--color-navbar)',
          button: {
            DEFAULT: 'var(--color-button)',
            darker: 'var(--color-button-darker)',
            lighter: 'var(--color-button-lighter)',
          },
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-text-base)',
          fill: 'var(--color-fill)',
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
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
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
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
