/* Base config:
  ========================================================================== */
const webpack = require('webpack');

const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Main const
const PATHS = {
  src: path.join(__dirname, '../src/client'), // Path to client sources
  dist: path.join(__dirname, '../dist'), // Output folder
  assets: 'assets'
};

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/views`; // Folder for all HTML files
const PAGES = fs                                   // List of
  .readdirSync(PAGES_DIR)                          // all
  .filter(fileName => fileName.endsWith('.html')); // HTML files

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}/js/[name].[hash].js`,
    path: PATHS.dist,
    /*
      publicPath: '/' - relative path for dist folder (js,css etc)
      publicPath: './' (dot before /) - absolute path for dist folder (js,css etc)
    */
    publicPath: '/',
    libraryTarget: 'var',
    library: 'client'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        // JavaScript
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        // Fonts
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        // Images / icons
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        // SCSS & CSS
        test: /\.s?css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `./postcss.config.js` }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src, // Example: import abc from "~/assets/img/abc.jpg"
      '@': `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/styles/[name].[hash].css`
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Images:
        {
          from: `${PATHS.src}/${PATHS.assets}/img`,
          to: `${PATHS.assets}/img`
        },
        // Fonts:
        {
          from: `${PATHS.src}/${PATHS.assets}/fonts`,
          to: `${PATHS.assets}/fonts`
        },
        // Static (copy to '/'):
        {
          from: `${PATHS.src}/static`,
          to: ''
        }
      ]
    }),

    /*
      Automatic creation any html pages (Don't forget to RERUN dev server!)
    */
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`
        })
    )
  ]
};
