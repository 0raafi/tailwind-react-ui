const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.@(js|ts|jsx|tsx|mdx)",
    "../stories/*.stories.@(js|ts|jsx|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        rule: {
          sideEffects: true,
          include: [
            path.resolve(__dirname),
            path.resolve(__dirname, "..", "src/"),
          ],
        },
      },
    },
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.optimization = {
      ...config.optimization,
      sideEffects: true,
    };

    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx"];

    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};
