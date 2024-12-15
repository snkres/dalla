import designSystem from '../dallah-design-system/tailwind.js'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@dallah/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    ...designSystem,
  },
}
