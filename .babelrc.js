module.exports = (api) => {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      ['@babel/preset-env', { targets: { browsers: 'last 1 Chrome version' } }],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      api.env('development') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
