const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        './src/index',
        './src/style'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'focus-components.min.js',
        publicPath: '/dist/',
        libraryTarget: 'var',
        library: 'FocusComponents'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                'screw_ie8': true,
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loaders: ['json']
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    }
};
