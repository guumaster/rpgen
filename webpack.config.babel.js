const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

export default () => ({
  entry: './src/index.js',
  devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : false,
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'rpgen.min.js',
    libraryTarget: 'umd',
    library: 'rpgen'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
})
