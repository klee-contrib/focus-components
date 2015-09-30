const devConfBuilder = require('webpack-focus').devConfig;
const focusComponentsConf = require('./focus-components.webpack');
const devConf = devConfBuilder(focusComponentsConf);
module.exports = devConf;
