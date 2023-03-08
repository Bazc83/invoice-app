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
          brand: {
            DEFAULT: 'var(--color-brand)',
            darker: 'var(--color-brand-darker)',
            lighter: 'var(--color-brand-lighter)',
          },
          pending: {DEFAULT: "var(--color-pending)", darker: "var(--color-pending-darker)"},
          quote: {DEFAULT: "var(--color-quote)", darker: "var(--color-quote-darker)"},
          paid: {DEFAULT: "var(--color-paid)", darker: "var(--color-paid-darker)"},
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-text-base)',
          inverted: 'var(--color-text-inverted)',
          fill: 'var(--color-fill)',
          'main-bg': 'var(--color-main-bg)',
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            darker: 'var(--color-secondary-darker)',
          },
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: {
            DEFAULT: 'var(--color-success)',
            darker: 'var(--color-success-darker)',
          },
          brand: {
            DEFAULT: 'var(--color-brand)',
            darker: 'var(--color-brand-darker)',
            lighter: 'var(--color-brand-lighter)',
          },
          navbar: 'var(--color-navbar)',
          button: {
            DEFAULT: 'var(--color-button)',
            darker: 'var(--color-button-darker)',
            lighter: 'var(--color-button-lighter)',
          },
          pending: {DEFAULT: "var(--color-pending)", darker: "var(--color-pending-darker)"},
          quote: {DEFAULT: "var(--color-quote)", darker: "var(--color-quote-darker)"},
          paid: {DEFAULT: "var(--color-paid)", darker: "var(--color-paid-darker)"},
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-text-base)',
          inverted: 'var(--color-text-inverted)',
          fill: 'var(--color-fill)',
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            darker: 'var(--color-secondary-darker)',
          },
          brand: {
            DEFAULT: 'var(--color-brand)',
            darker: 'var(--color-brand-darker)',
            lighter: 'var(--color-brand-lighter)',
          },
          edit: 'var(--color-edit)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          success: 'var(--color-success)',
          'btn-default': 'var(--color-button-default)',
          pending: {DEFAULT: "var(--color-pending)", darker: "var(--color-pending-darker)"},
          quote: {DEFAULT: "var(--color-quote)", darker: "var(--color-quote-darker)"},
          paid: {DEFAULT: "var(--color-paid)", darker: "var(--color-paid-darker)"},
        },

      },
      ringColor: {
        skin: {
          primary: {
            DEFAULT: 'var(--color-primary)',
          },
          brand: {
            DEFAULT: 'var(--color-brand)',
            darker: 'var(--color-brand-darker',
            lighter: 'var(--color-brand-lighter)',
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
        sm: '425px',
        md: '640px',
        lg: '1024px',
        print: { raw: 'print' },
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('@tailwindcss/forms')],
};
