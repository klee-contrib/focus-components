/** @jsx React.DOM */
/*global jest, expect*/

// __tests__/qs-scope-test.js
var React = require('react/addons');
jest.dontMock('../scope.js');
var Scope = React.createClass(require('../scope.js'));
var TestUtils = React.addons.TestUtils;
var scopes =  [
  {code: null, label: "None", style: "qs-scope-none"},
  {code: 1, label: "Scope1", style: "test2"},
  {code: 2, label: "Scope2", style: "test3"},
  {code: 3, label: "Scope3", style: "test4"}
];
var scope = 1;

// Render a checkbox with label in the document
var scope = TestUtils.renderIntoDocument(
  React.createElement(Scope, {list: scopes, value: scope})
);
describe('## QS-Scope', function() {
  it('the initialize state should not have a list', function() {
    // Verify that it's Off by default
    var scopeDown = TestUtils.findRenderedDOMComponentWithClass(
      scope, 'qs-scope-deploy-down');
    expect(scopeDown).toBeDefined();
  });
  it('the clicked state should have a list', function(){
    var node = TestUtils.findRenderedDOMComponentWithClass(
      scope, 'qs-scope-deploy-down');
    React.addons.TestUtils.Simulate.click(node);
    var scopeUp = TestUtils.findRenderedDOMComponentWithClass(
      scope, 'qs-scope-deploy-up');
    expect(scopeUp).toBeDefined();
  });
});
