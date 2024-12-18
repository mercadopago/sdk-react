module.exports = {
  stories: ['./stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-webpack5-compiler-babel'],
  features: {},

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
