import { designTokens } from '@dallah/design-system'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // Add the external packages that are using Tailwind CSS
  ],
  theme: {
    ...designTokens,
  },
}
