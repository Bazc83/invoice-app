module.exports = {
  plugins: [require('prettier-plugin-tailwindcss'), require('eslint-plugin-prettier')],
  tailwindConfig: './tailwind.config.cjs',
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
}