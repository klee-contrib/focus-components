
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

const { renderIntoDocument, Simulate } = TestUtils;
import identity from 'lodash/utility/identity';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

import { component as Scope } from '../scope';

let scopes = [
    { code: null, label: 'None', style: 'qs-scope-none' },
    { code: 'movie', label: 'Scope1', style: 'test2' },
    { code: 'audio', label: 'Scope2', style: 'test3' },
    { code: 'chat', label: 'Scope3', style: 'test4' }
];

describe('ScopeMixin', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('Create default scope', () => {
        describe('Check if it show its displayName', () => {
            let scopeDisplayName;
            it('should have a displayName', () => {
                scopeDisplayName = Scope.displayName;
                expect(typeof scopeDisplayName).toBe('string')
            });
            it('displayName should be \'Scope\'', () => {
                scopeDisplayName = Scope.displayName;
                expect(scopeDisplayName).toBe('Scope');
            });
        });
        describe('Check if it renders the good given scope', () => {
            let component;
            beforeEach(() => {
                component = renderIntoDocument(<Scope value={'movie'} list={scopes} />);
            });
            it('should return the active scope', () => {
                expect(component._getActiveScope()).toBe(scopes[1]);
            });
            it('should return the active scope\'s label', () => {
                const activeScope = component._getActiveScope();
                expect(activeScope.label).toBe('Scope1');
            });
            it('should not return another label than the active scope\'s one', () => {
                const activeScope = component._getActiveScope();
                expect(activeScope.label).not.toBe('Scope2' || 'Scope3' || 'None');
            });
        });
        describe('Check a none set scopes', () => {
            let component, studiedScope;
            beforeEach(() => {
                component = renderIntoDocument(<Scope />);
            });
            it('should get the created <ul> className', () => {
                expect(component.refs.scopeDropdown.className).toMatch('mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect')
            });
            it('should have only on <li>"', () => {
                expect(component.refs.scopeDropdown.childNodes.length).toBe(1);
            });
            it('this only <li> should render "scopes.empty"', () => {
                expect(component.refs.scopeDropdown.firstChild.textContent).toBe('scopes.empty');
            });
        });
    });
});
