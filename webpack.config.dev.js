const path = require('path');
module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'focus-components.js',
        publicPath: '/dist/',
        libraryTarget: 'var',
        library: 'FocusComponents'
    },
    directory: path.join(__dirname, 'src'),
    port: 3001,
    styleFileName: 'focus-components.css'
};
