const path = require('path');

module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  testMatch: [
    '**/__tests__/**/*.{js,jsx,mjs}',
    '**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coverageReporters: [
    "lcov",
    "html"
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/utils/jest/babelTransform.js',
    '^.+\\.(css|less)$': '<rootDir>/utils/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|less|json|graphql)$)': '<rootDir>/utils/jest/fileTransform.js'
  },
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/utils/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/utils/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: [
    '^.+\\.module\\.css$',
  ],
  moduleFileExtensions: [
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/storybook/",
    "<rootDir>/utils/"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/storybook/",
    "<rootDir>/utils/"
  ],
  setupFilesAfterEnv: ['<rootDir>/utils/jest/jest-setup.js'],
  testURL: "http://localhost",
  verbose: true,
};