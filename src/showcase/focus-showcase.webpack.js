const path = require('path');
console.log(path.join(__dirname, '../../src'));
module.exports = {
    entry: ['./app'],
    directory: path.join(__dirname, '../../src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'focus-showcase.js',
        publicPath: '/dist/'
    },
    port: process.env.PORT || 3000
};
