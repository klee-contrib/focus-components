const path = require('path');
const webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    './app'
  ],
  output: {
     path: path.join(__dirname, 'dist'),
     filename: 'focus-showcase.js',
     publicPath: '/dist/'
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../../src')
  }, {
      test: /\.json$/,
      loaders: ['json']
  }]
  }
};
