
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import AutocompleteTextEdit from '../edit';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};


const { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate } = TestUtils;

const data = [
    {
        key: 'JL',
        label: 'Joh Lickeur'
    },
    {
        key: 'GK',
        label: 'Guénolé Kikabou'
    },
    {
        key: 'YL',
        label: 'Yannick Lounivis'
    }
];

describe('AutocompleteTextEdit', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        init(i18nConfig);
    });

    describe('When no value is given', () => {
        let autocompleteTextEdit;
        beforeEach(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit />);
            jest.runAllTimers();
        });
        it('should have a null object when getValue is called', () => {
            expect(autocompleteTextEdit.getValue()).toBeNull();
        });
    });
    describe('When a value is given', () => {
        let autocompleteTextEdit;
        const _value = 'hello';
        beforeEach(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit value={_value} />);
            jest.runAllTimers();
        });
        it('should render the given value', () => {
            expect(autocompleteTextEdit.getValue()).toBe('hello');
        });
    });
    describe('When a value is typed by the user', () => {
        let autocompleteTextEdit;
        const _query = 'hello from the other side';
        let inputRef, initialState, dataResults;
        let querySearcherSpy;
        beforeEach(() => {
            querySearcherSpy = jest.fn();
            const _querySearcher = query => {
                querySearcherSpy(query);
                dataResults = data;
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.focus(inputRef);
            Simulate.change(inputRef, { target: { value: _query } });
            jest.runAllTimers();
            // autocompleteTextEdit.setState({ hasFocus: true });
        });
        it('should update the inputValue state', () => {
            expect(autocompleteTextEdit.state.inputValue).toBe(_query);
        });
        it('should return the new value on the getValue call', () => {
            expect(autocompleteTextEdit.getValue()).toBe(_query);
        });
        it('should call the querySearcher', () => {
            expect(querySearcherSpy).toHaveBeenCalledTimes(1);
            expect(querySearcherSpy).toHaveBeenCalledWith(_query);
        });
        it('should update the state \'suggestions\'', () => {
            expect(autocompleteTextEdit.state).not.toBe(initialState);
        });
        it('should have the same data has the object given by the promise', () => {
            expect(autocompleteTextEdit.state.suggestions).toBe(dataResults);
        });
        it('should create an <ul>', () => {
            expect(autocompleteTextEdit.refs.suggestions).toBeDefined();
        });
        it('should have created <li>s in the <ul>', () => {
            const arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            expect(arr[0]).toBeDefined();
        });
        describe('When the data is empty and the error is set', () => {
            let inputRef;
            let _query = 'test';
            const customError = 'Sorry, no data.'
            const _querySearcher = query => {
                const emptyData = [];
                return Promise.resolve({
                    emptyData,
                    totalCount: emptyData.length
                });
            };
            beforeEach(() => {
                autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} error={customError} />);
                inputRef = autocompleteTextEdit.refs.inputText;
                Simulate.change(inputRef, { target: { value: _query } })
                jest.runAllTimers();
            })
            it('should set the error state', () => {
                expect(autocompleteTextEdit.state.error).toBe(customError);
            });
            it('should set the error <span> value', () => {
                expect(autocompleteTextEdit.refs.errorMessage.textContent).toBe(customError);
            });
        });
    });
    describe('When the value is cleared by the user', () => {
        let autocompleteTextEdit;
        const _query = '';
        let inputRef, dataResults;
        const _querySearcher = query => {
            dataResults = data;
            return Promise.resolve({
                data,
                totalCount: data.length
            });
        };
        beforeEach(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            Simulate.change(inputRef, { target: { value: _query } });
            jest.runAllTimers();
        });
        it('should returns an empty value', () => {
            expect(autocompleteTextEdit.getValue()).toBe('');
        });
    });
    // FIX ME : test are done when suggestions are not displayed yet.
    describe.skip('When a suggestion is selected by the user', () => {
        let autocompleteTextEdit, selectedLI, inputRef, initialState;
        let _query = 'Hola';
        let arr;
        beforeEach(() => {
            const _querySearcher = query => {
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} inputTimeout={0} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.focus(inputRef);
            jest.runAllTimers();
            Simulate.change(inputRef, { target: { value: _query } });
            jest.runAllTimers();
            arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            selectedLI = arr[0];
            Simulate.mouseDown(selectedLI);

            // autocompleteTextEdit.setState({ hasFocus: true });
        });
        it('should change the input value', () => {
            expect(autocompleteTextEdit.refs.inputText.value).toBe(selectedLI.textContent);
            // Simulate.change(inputRef,  target: { value: _query } );
        });
        it('should change component\'s state \'inputValue\'', () => {
            expect(autocompleteTextEdit.state.inputValue).toBe(selectedLI.textContent);
            expect(autocompleteTextEdit.state.inputValue).toBe(autocompleteTextEdit.refs.inputText.value);
            // Simulate.change(inputRef, { target: { value: _query } });
        });
        it('should change component\'s state \'hasSuggestions\' to false', () => {
            expect(autocompleteTextEdit.state.hasSuggestions).toBe(false);
        });
        it('should delete the <ul> on the DOM', () => {
            expect(autocompleteTextEdit.refs.suggestions).toBe(undefined);
        });
        it('should set an empty suggestions state array', () => {
            expect(autocompleteTextEdit.state.suggestions.length).toBe(0);
        });
    });
    describe('When the user clicks on the inputText', () => {
        let autocompleteTextEdit, inputRef;
        const query = 'hello from the upside';
        beforeEach(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit />);
            inputRef = autocompleteTextEdit.refs.inputText;
            Simulate.focus(inputRef);
            jest.runAllTimers();
        });
        it('should set the hasFocus state to true', () => {
            expect(autocompleteTextEdit.state.hasFocus).toBe(true);
        });
    });
});
