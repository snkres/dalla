import designSystem from '../../packages/dallah-design-system/tailwind.js'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // Add the external packages that are using Tailwind CSS
  ],
  theme: {
    ...designSystem,
  },
}
