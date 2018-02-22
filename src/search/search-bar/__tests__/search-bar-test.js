
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

const { renderIntoDocument, Simulate } = TestUtils;
import identity from 'lodash/utility/identity';
import { component as SearchBar } from '../../search-bar';
import { quickSearchStore } from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

describe('SearchBar with no scope', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('When a default search bar is in the DOM', () => {
        let component;
        beforeEach(() => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} />);
        });
        it('should have the loading state set to false', () => {
            expect(component.state.loading).toBe(false);
        });
        it('shouldn\'t have any scope', () => {
            expect(component.props.scopes.length).toBe(0);
        });
        it('should have a default rendered placeholder', () => {
            expect(component.props.placeholder).toBe('search.bar.placeholder');
        });
        it('should create a default input text named \'searchbarinput\'', () => {
            expect(component.refs.query.props.name).toBe('searchbarinput');
        });
    });
    describe('Check configured SearchBar\' behaviour', () => {
        let onChangeSpy, input, initialValue, configuredComponent, action;
        beforeEach(done => {
            onChangeSpy = jest.fn();
            action = {
                updateProperties({ query }) {
                    onChangeSpy(query);
                    if (query != undefined)
                        configuredComponent.setState({ loading: true });
                    done();
                }
            };
            configuredComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={action} placeholder='Search here...' />);
            input = configuredComponent.refs.query.refs.htmlInput;
            initialValue = configuredComponent.state.query;
            Simulate.change(input, { target: { value: 'Boy' } });
        });
        describe('When the placeholder has been set', () => {
            it('shouldn\'t have the default\`s one', () => {
                expect(configuredComponent.props.placeholder).not.toBe('search.bar.placeholder');
            });

            it('should have different placeholder than the default\`s one', () => {
                expect(configuredComponent.props.placeholder).toBe('Search here...');
            });
        });
        describe('Simulate onChange behaviour', () => {
            it('should set the loading state to true', () => {
                expect(onChangeSpy).toHaveBeenCalled();
                expect(configuredComponent.state.loading).toBe(true);
            });
            it('should change the query state (default query state is \'undefined\')', () => {
                expect(onChangeSpy).toHaveBeenCalled();
                expect(initialValue).toBe(undefined);
                expect(configuredComponent.state.query).toBe('Boy');
            });
        });
        describe('Simulate onKeyPress behaviour', () => {
            let input, inputKeyPress, initialValue, onKeyPressSpy, secondComponent, searchAction, pressure;
            beforeEach(done => {
                pressure = {
                    key: 'Enter'
                };
                onKeyPressSpy = jest.fn();
                searchAction = {
                    updateProperties({ query }) {
                        onKeyPressSpy(query);
                        if (query != undefined) { }
                        secondComponent.setState({ query: query, loading: true });
                        done();
                    }
                };
                secondComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={searchAction} />);
                input = secondComponent.refs.query.refs.htmlInput;
                initialValue = secondComponent.state.query;
                input.value = 'test';
                Simulate.keyPress(input, pressure);
            });
            it('should change the query state', () => {
                expect(onKeyPressSpy).toHaveBeenCalledTimes(1);
                expect(secondComponent.state.query).not.toBe(undefined);
            });
            it('should change the loading state', () => {
                expect(secondComponent.state.loading).toBe(true);
            });
        });
    });
});
