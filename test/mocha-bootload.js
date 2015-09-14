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
const React = require('react/addons');

// Globals
global.React = React;
global.expect = chai.expect;
global.sinon = sinon;
global.TestUtils = React.addons.TestUtils;

// Js dom
import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
