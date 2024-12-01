module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['all', 'dashboard', 'platform', 'storybook']],
    'subject-case': [2, 'always', 'lower-case'],
  },
}
