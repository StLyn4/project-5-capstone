/* Build (Prod) config:
  ========================================================================== */

//const OfflinePlugin = require('offline-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Source: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');
// Base config
const baseWebpackConfig = require('./base');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    //new OfflinePlugin(),
    new WorkboxPlugin.GenerateSW({
      inlineWorkboxRuntime: true
    }),
    new CleanWebpackPlugin()
  ]
});
