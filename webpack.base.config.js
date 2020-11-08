'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/renderer/components/'),
      views: path.resolve(__dirname, 'src/renderer/views/'),
    },
  },
  devtool: 'source-map',
  plugins: [],
};
