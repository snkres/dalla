import dallaConfig from './packages/eslint-config-dalla/index.js'

export default [
  dallaConfig,
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
