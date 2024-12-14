import path from 'path'

export default {
  stories: [
    {
      directory: '../../dallah-design-system/src/**',
      files: '*.stories.*',
      titlePrefix: 'Design System',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../dallah-design-system/src'),
    }
    return config
  },
  docs: {
    autodocs: true,
  },
}
