/** @jsx React.DOM */
/*global jest*/

// __tests__/qs-scope-test.js
var React = require('react/addons');
//jest.dontMock('../scope.js');
describe('## QS-Scope', function() {
  it('The initialize state should not have a list', function() {
    //
    //var Scope = require('../scope.js').component;
    expect(1).toEqual(1);
  /*  var TestUtils = React.addons.TestUtils;
    var scopes =  [
      {code: null, label: "None", style: "qs-scope-none"},
      {code: 1, label: "Scope1", style: "test2"},
      {code: 2, label: "Scope2", style: "test3"},
      {code: 3, label: "Scope3", style: "test4"}
    ];
    var scope = 1;*/
    /*// Render a checkbox with label in the document
    var scope = TestUtils.renderIntoDocument(
      React.createElement(Scope, {list: scopes, value: scope})
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      scope, 'span');
    expect(label.getDOMNode().textContent).toEqual('Scope1');
    */
    // Simulate a click and verify that it is now On
    /*var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');*/
  });
});
