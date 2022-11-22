const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
  },
  entry: './src/index.ts',
  output: {
    path: distRoot,
    filename: optimize ? 'clodeo.min.js' : 'clodeo.js',
    library: 'ClodeoUI',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /__tests__/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: `dist-${optimize ? 'prod' : 'dev'}`,
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              esModule: false,
              modules: {
                namedExport: false,
                localIdentName: "[name]__[local]",
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|svg|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      runtime: false,
      filename:  'styles.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    antd: 'antd',
    '@ant-design/charts': 'AntDesignCharts',
    '@ant-design/icons': 'AntDesignIcons',
  },
});