import designSystem from '../dallah-design-system/tailwind'

export default {
  presets: [designSystem],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@dallah/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
}
