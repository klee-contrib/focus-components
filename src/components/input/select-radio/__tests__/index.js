
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import SelectRadio from '../';
const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = TestUtils;

const values = [
    { code: 'A', label: 'Value A' }, { code: 'B', label: 'Value B' }, { code: 'C', label: 'Value C' }
];

describe('Select Radio Component', () => {
    describe('Rendering', () => {
        describe('When a default select-radio is rendered', () => {
            let renderedSelectRadio;
            beforeEach(() => {
                renderedSelectRadio = renderIntoDocument(<SelectRadio value='B' values={values} />);
            });
            it('should have its default state value equals to the props value', () => {
                expect(renderedSelectRadio.state.value).toBe(renderedSelectRadio.props.value)
            });
        });
        describe('When a radio is selected', () => {
            let renderedSelectRadio, arr, initalValueState;
            beforeEach(() => {
                renderedSelectRadio = renderIntoDocument(<SelectRadio value='B' values={values} />);
                arr = scryRenderedDOMComponentsWithTag(renderedSelectRadio, 'input')
                initalValueState = renderedSelectRadio.state.value;
                Simulate.change(arr[2]);
            });
            it('should change the state value', () => {
                expect(renderedSelectRadio.state).not.toBe(initalValueState);
            });
            it('should check the radio', () => {
                expect(arr[2].value).toBe('true');
            });
        });
    });
});
