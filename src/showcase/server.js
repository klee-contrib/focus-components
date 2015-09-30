const path = require('path');
const serverBuilder = require('webpack-focus').server;
const focusShowcaseConf = require('./focus-showcase.webpack');
serverBuilder(focusShowcaseConf);
