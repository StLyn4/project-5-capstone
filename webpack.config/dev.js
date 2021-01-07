/* Development config:
  ========================================================================== */
const webpack = require('webpack');

// Source: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');
// Base config
const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: 'errors-only',
    port: 8080,
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
  ]
});
