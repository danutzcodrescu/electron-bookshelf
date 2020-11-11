const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.main.config');

module.exports = [
  merge(baseConfig[0], {
    mode: 'production',
    optimization: {
      minimize: false,
    },
  }),
  merge(baseConfig[1], {
    mode: 'production',
  }),
];
