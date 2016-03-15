const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const Scope = require('../scope').component;
var scopes =  [
    {code: null, label: "None", style: "qs-scope-none"},
    {code: 1, label: "Scope1", style: "test2"},
    {code: 2, label: "Scope2", style: "test3"},
    {code: 3, label: "Scope3", style: "test4"}
];
var scope = 1;

describe('ScopeMixin', () => {
    // Tests on a none set default ScopeMixin
    describe('Create default scope', () => {
        describe('Check if it show its displayName', () => {
            let scopeDisplayName;
            it('should have a displayName', () => {
                scopeDisplayName = Scope.displayName;
                expect(scopeDisplayName).to.be.a('string');
            });
            it('displayName should be \'Scope\'', () => {
                scopeDisplayName = Scope.displayName;
                expect(scopeDisplayName).to.equal('Scope');
            });
        });
        describe('test', () => {
            let component;
            before( () => {
                component = renderIntoDocument(<Scope value='scope' list={scopes}/>);
            });
            it('should return the active scope', () => {
                // here we'll test _getActiveScope function !!! See you tomorrow
            });
        });
    });
});

/*global jest, expect*/

// __tests__/qs-scope-test.js
/*var React = require('react/addons');
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
*/
