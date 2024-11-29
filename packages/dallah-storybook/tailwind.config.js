module.exports = {
  presets: [
    require('@vercel/examples-ui/tailwind'),
    require('@dallah/design-system/tailwind'),
  ],
  content: [
    // All the packages that might include stories
    './node_modules/@vercel/examples-ui/**/*.js',
    './node_modules/@dallah/design-system/**/*.js',
    './node_modules/@dallah/pages/**/*.js',
  ],
}
