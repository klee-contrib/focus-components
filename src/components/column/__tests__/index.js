
import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Column from '../';
const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = TestUtils;

const Wrapper = React.createClass({
    render: function() {
        return (
            <div>{this.props.children}</div>
        );
    }
});

describe('Select Column Component', () => {
    describe('Rendering', () => {
        describe('When a default column is rendered', () => {
            let renderedColumn, arr;
            beforeEach(() => {
                renderedColumn = renderIntoDocument(<Wrapper><Column /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedColumn, 'div');
            });
            it('should have the default material cell className', () => {
                expect(arr[1].className.trim()).toBe('mdl-cell mdl-cell--6-col');
            });
        });
        describe('When we give a size to the column', () => {
            let renderedColumn, arr, size;
            beforeEach(() => {
                size = 3;
                renderedColumn = renderIntoDocument(<Wrapper><Column size={size} /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedColumn, 'div');
            });
            it('should have an adapted className', () => {
                expect(arr[1].className.trim()).toBe('mdl-cell mdl-cell--' + size + '-col');
            });
        });
    });
});
