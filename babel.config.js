module.exports = function(api) {
  const isBabelLoader = api.caller(caller => caller.name === 'babel-loader');
  const env = api.env();

  let dev = false;
  let modules;

  switch (env) {
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
      modules = false;
      break;
    case 'cjs':
    default:
      modules = 'commonjs';
  }

  return {
    presets: [
      [
        "@babel/preset-typescript"
      ],
      [
        "@babel/preset-env",
        {
          "modules": modules
        }
      ],
      [
        "@babel/preset-react",
        {
          "development": dev,
          "throwIfNamespace": false
        }
      ]
    ],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      ...(isBabelLoader ? [
        ["import", { "libraryName": "antd", "style": "css" }, 'antd'],
        ["import", { "libraryName": "@ant-design/icons", "libraryDirectory": "", camel2DashComponentName: false }, '@ant-design/icons'],
      ] : [
        ["import", { "libraryName": "antd" }, 'antd'],
        ["import", { "libraryName": "@ant-design/icons", "libraryDirectory": "", camel2DashComponentName: false }, '@ant-design/icons'],
        ["transform-rename-import", {
          "original": "^(.+?)\\.scss$",
          "replacement": "$1.css"
        }]
      ])
    ]
  }
}
