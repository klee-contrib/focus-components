const serverBuilder = require('webpack-focus').server;
const focusComponentsConf = require('./webpack.config.dev');
serverBuilder(focusComponentsConf);
