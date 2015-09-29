const focusShowcaseConf = require('./focus-showcase.webpack');
const devConfBuilder = require('webpack-focus').devConfig;
module.exports = devConfBuilder(focusShowcaseConf);
