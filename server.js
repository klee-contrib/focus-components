const serverBuilder = require('webpack-focus').server;
const focusComponentsConf = require('./focus-components.webpack');
serverBuilder(focusComponentsConf);
