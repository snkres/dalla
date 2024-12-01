const next = require('eslint-config-next')
const prettier = require('eslint-config-prettier')
const turbo = require('eslint-config-turbo')

module.exports = [
  ...next,
  ...turbo,
  ...prettier,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]
