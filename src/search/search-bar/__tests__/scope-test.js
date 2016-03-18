const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const Scope = require('../scope').component;

var scopes =  [
    {code: null, label: "None", style: "qs-scope-none"},
    {code: 'movie', label: "Scope1", style: "test2"},
    {code: 'audio', label: "Scope2", style: "test3"},
    {code: 'chat', label: "Scope3", style: "test4"}
];

describe('ScopeMixin', () => {
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
                component = renderIntoDocument(<Scope value={'movie'} list={scopes}/>);
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
        describe('Check a none set scopes', () => {
            let component, studiedScope;
            before( () => {
                component = renderIntoDocument(<Scope />);
            });
            it('should get the created <ul> className', () => {
                expect(component.refs.scopeDropdown.className).to.equal('mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect')
            });
            it('should have only on <li>"', () => {
                expect(component.refs.scopeDropdown.childNodes.length).to.equal(1);
            });
            it('this only <li> should render "scopes.empty"', () => {
                expect(component.refs.scopeDropdown.firstChild.textContent).to.equal('scopes.empty');
            });
        });
    });
});
