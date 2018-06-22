const HtmlWebPackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')

const common = require('./webpack.config')

const baseConfig = merge(common, {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebPackPlugin({
      template: './examples/index.html',
      filename: './index.html'
    }),
    new HtmlWebPackPlugin({
      template: './examples/remote.html',
      filename: './remote.html'
    }),
    new HtmlWebPackPlugin({
      template: './examples/tpl.html',
      filename: './tpl.html'
    }),
    new HtmlWebPackPlugin({
      template: './examples/vue_generator.html',
      filename: './vue_generator.html',
      minify: false
    }),
    new HtmlWebPackPlugin({
      template: './examples/vue_roller.html',
      filename: './vue_roller.html'
    })
  ]
})

module.exports = baseConfig
