import dallahConfig from './packages/eslint-config-dallah/index.js'

export default [
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
