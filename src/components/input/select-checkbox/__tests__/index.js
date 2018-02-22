
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import SelectCheckbox from '../';
const { renderIntoDocument, Simulate } = TestUtils;

const possibleValues = [
    { value: 'A', label: 'Value A' },
    { value: 'B', label: 'Value B' },
    { value: 'C', label: 'Value C' },
    { value: 'D', label: 'Value D' }
];

describe('Select Checkbox Component', () => {
    describe('Rendering', () => {
        describe('When a default select-checkbox is rendered', () => {
            let renderedSelectCheckbox;
            beforeEach(() => {
                renderedSelectCheckbox = renderIntoDocument(<SelectCheckbox value={['B', 'C']} values={possibleValues} />);
            });
            it('should have its default state selectedValues equals to the props value', () => {
                expect(renderedSelectCheckbox.props.value).toBe(renderedSelectCheckbox.state.selectedValues);
            });
        });
    });
});
