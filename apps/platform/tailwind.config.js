import { designTokens } from '@dallah/design-system'
import { plugin } from 'postcss'
import rombo from 'tailwindcss-motion'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dallah/design-system/src/**/*.{js,ts,jsx,tsx}',
    // Add the external packages that are using Tailwind CSS
  ],
  theme: {
    extend: {
      ...designTokens,
    },
  },
  plugins: [
    rombo,
    function ({ addComponents, theme }) {
      addComponents({
        '.container-fluid': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          maxWidth: '100%',
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
          '@screen xl': {
            maxWidth: theme('screens.2xl'),
          },
          '@screen 2k': {
            maxWidth: theme('maxWidth.2k'),
          },
          '@screen 4k': {
            maxWidth: theme('maxWidth.4k'),
          },
        },
      })
    },
  ],
}
