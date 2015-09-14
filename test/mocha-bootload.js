// Global configuration uese for tests.
require('babel/register')({
    optional: ['runtime', 'es7.asyncFunctions']
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
chai.use(sinonChai);
const React = require('react');

// Globals
global.React = React;
global.expect = chai.expect;
global.sinon = sinon;
global.TestUtils = require('react-addons-test-utils');

// Js dom
import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
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
