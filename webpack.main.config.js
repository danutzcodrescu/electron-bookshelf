const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = [
  merge(baseConfig, {
    target: 'electron-main',
    entry: {
      main: './src/main/main.ts',
    },
    externals: {
      typeorm: 'commonjs typeorm',
      sqlite3: 'commonjs sqlite3',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
              plugins: [
                'babel-plugin-transform-typescript-metadata',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-optional-chaining',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   cleanStaleWebpackAssets: true,
      // }),
      new ForkTsCheckerWebpackPlugin({ typescript: { configOverwrite: { include: ['./src/main'] } } }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ],
  }),
  merge(baseConfig, {
    target: 'electron-preload',
    entry: {
      inject: './src/main/preload.ts',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                ['@babel/preset-env', { targets: { browsers: 'last 1 Chrome version' } }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },
  }),
];
