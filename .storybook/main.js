const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|ts|jsx|tsx|mdx)",
    "../stories/*.stories.@(js|ts|jsx|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        rule: {
          sideEffects: true,
          include: [
            path.resolve(__dirname),
            path.resolve(__dirname, '..', 'src/'),
          ]
        }
      }
    }
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    config.optimization = {
      ...config.optimization,
      sideEffects: true
    };

    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];

    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    }
  }
};
