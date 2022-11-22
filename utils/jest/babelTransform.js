'use strict';

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  babelrc: false,
  presets: [
    ['@babel/preset-react'],
    ['@babel/preset-env', {
      modules: 'auto',
      useBuiltIns: 'entry',
      corejs: 3,
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-dynamic-import-node',
  ]
});