import path from 'path'
import { fileURLToPath } from 'url'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

export default [
  {
    ignores: ['.next'],
  },

  // Next.js / React
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
  ...fixupConfigRules(compat.extends('plugin:react/recommended')),
  ...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
  ...fixupConfigRules(compat.extends('plugin:jsx-a11y/strict')),

  // Tailwind CSS
  // ...fixupConfigRules(compat.extends('plugin:tailwindcss/recommended')),

  ...fixupConfigRules(compat.extends('plugin:storybook/recommended')),

  eslintConfigPrettier,

  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
    rules: {
      'no-html-link-for-pages': 'off',
    },
  },
]
