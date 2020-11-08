const { merge } = require('webpack-merge');
const spawn = require('child_process').spawn;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    port: 2003,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchOptions: {
      poll: true,
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    before() {
      console.log('Starting main process');
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => process.exit(code))
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
});
