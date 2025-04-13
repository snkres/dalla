import { designTokens } from '../dalla-design-system/src'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@dalla/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    ...designTokens,
  },
}
