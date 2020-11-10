const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.main.config');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = [
  merge(baseConfig[0], {
    watch: true,
    plugins: [
      new NodemonPlugin({
        exec: 'electron ./dist/main.js',
      }),
    ],
  }),
  baseConfig[1],
];
