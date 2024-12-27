import { designTokens } from '@dallah/design-system'
import { plugin } from 'postcss'
import rombo from 'tailwindcss-motion'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dallah/design-system/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dallah/components/src/**/*.{js,ts,jsx,tsx}',

    // Add the external packages that are using Tailwind CSS
  ],
  theme: {
    extend: {
      ...designTokens,
    },
  },
  plugins: [rombo],
}
