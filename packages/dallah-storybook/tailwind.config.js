import { designTokens } from '../dallah-design-system/src'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@dallah/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    ...designTokens,
  },
}
