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

          maxWidth: '100%',
          '@screen sm': {},
          '@screen lg': {},
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
