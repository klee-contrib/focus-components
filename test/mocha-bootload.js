// Global configuration uese for tests.
require('babel-core/register')({
    presets: [
        'stage-0',
        'react',
        'es2015'
    ],
    plugins: [
        'transform-class-properties',
        'transform-decorators-legacy'
    ]
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
chai.use(sinonChai);

// Js dom
import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};
const React = require('react');
// Globals
global.React = require('react');
global.ReactDOM = require('react-dom');
global.expect = chai.expect;
global.sinon = sinon;
global.TestUtils = require('react-addons-test-utils');
global.sandbox = require('./sandbox');
global.TestFocus = require('./test-focus');
global.componentHandler = {upgradeElement: function(){}};
global.__DEV__ = process.env.DEV ? JSON.parse(process.env.DEV) : true;

// take all properties of the window object and also attach it to the
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (const key in window) {
        if (!window.hasOwnProperty(key)) {continue; }
        if (key in global) {continue; }
        global[key] = window[key];
    }
}
// mocha global object
propagateToGlobal(window);


process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
