const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const Scope = require('../scope').component;

var scopes =  [
    {code: null, label: "None", style: "qs-scope-none"},
    {code: 1, label: "Scope1", style: "test2"},
    {code: 2, label: "Scope2", style: "test3"},
    {code: 3, label: "Scope3", style: "test4"}
];

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
        describe('Check if it renders the good given scope', () => {
            let component;
            before( () => {
                component = renderIntoDocument(<Scope value={1} list={scopes}/>);
            });
            it('should return the active scope', () => {
                expect(component._getActiveScope()).to.equal(scopes[1]);
            });
            it('should return the active scope\'s label', () => {
                const activeScope = component._getActiveScope();
                expect(activeScope.label).to.equal("Scope1");
            });
            it('should not return another label than the active scope\'s one', () => {
                const activeScope = component._getActiveScope();
                expect(activeScope.label).to.not.equal("Scope2" || "Scope3" || "None");
            });
        });
        describe('Check if it renders onClick', () => {
            let component, onClickSpy, studiedScope;
            before( () => {
                component = renderIntoDocument(<Scope value={1} list={scopes} />);
                studiedScope = component.refs.scopeDropdown.childNodes[3];
                onClickSpy = sinon.spy(studiedScope, 'click');
            });
            it('should set scope to active', () => {
                studiedScope.click();
                expect(onClickSpy).to.have.been.called.once;
                expect(studiedScope.attributes[2].value).to.equal('3');
                expect(studiedScope.attributes[1].value).to.equal('true');

                //expect(component.refs.scopeDropdown.childNodes[1].attributes[1].value).to.equal('true');
                /*const parent = component.refs.parent;
                parent.className = 'mdl-menu__container is-upgraded';
                component.refs.scopeDropdown.childNodes[1].click();
                expect(parent.className).to.equal('mdl-menu__container is-upgraded');*/
                //expect(onClickSpy).to.have.been.called.once;
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
