const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'rpgen.js',
    globalObject: 'this',
    library: 'rpgen',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash']
          }
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin()
  ]
}
