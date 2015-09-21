const path = require('path');
const webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
     path: path.join(__dirname, 'dist'),
     filename: 'focus-components.js',
     publicPath: '/dist/',
     libraryTarget: 'var',
     library: 'FocusComponents'
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
  }, {
      test: /\.json$/,
      loaders: ['json']
  }]
  }
};
