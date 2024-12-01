const dallahConfig = require('./packages/eslint-config-dallah/index.js')

module.exports = [
  dallahConfig,
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      next: {
        rootDir: ['apps/*/'],
      },
    },
  },
]
