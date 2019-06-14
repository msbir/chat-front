'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const loadMinified = require('./load-minified')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const version = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim();

// fs.readFile(path.join(__dirname, '../config/prod.env.js'), 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }

//   var result = data.replace(/GIT_VERSION:.*'/g, `GIT_VERSION: '"${version}"'`);

//   fs.writeFile(path.join(__dirname, '../config/prod.env.js'), result, 'utf8', function (err) {
//     if (err) return console.log(err);
//   });
// });

env.VERSION = `'${version}'`;

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      /*serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`*/
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      importScripts: ['./static/env-vars.js']
    })

    // service worker caching
    // Aug-10-2018: Evgeny added png.  TODO to define specific files at runtime caching


    /*new SWPrecacheWebpackPlugin({
      cacheId: 'yoho',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/!**!/!*.{js,html,css,png}'],
      minify: true,
      stripPrefix: 'dist/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/popper/,
          handler: 'cacheFirst'
        }
        /!*,
        {
          urlPattern: /^https:\/\/dev001\.yoho.eu[\s\S]*!/,
          handler: 'cacheFirst'
        }*!/
      ]
    })*/
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
