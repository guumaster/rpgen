const merge = require('webpack-merge')
const path = require('path')

const common = require('./webpack.config')

const baseConfig = merge(common, {
  devtool: 'source-map',
  mode: 'production'
})

let targets = ['web', 'node'].map((target) => {
  return merge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, './lib/'),
      filename: `rpgen.${target}.js`
    }
  })
})

module.exports = targets
