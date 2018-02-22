
import TestUtils from 'react-dom/test-utils';
import React from 'react';

import Grid from '../';
const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = TestUtils;

class Wrapper extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

describe('Select Grid Component', () => {
    describe('Rendering', () => {
        describe('When a default grid is rendered', () => {
            let renderedGrid, arr;
            beforeEach(() => {
                renderedGrid = renderIntoDocument(<Wrapper><Grid /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedGrid, 'div');
            });
            it('should have the default cell className', () => {
                expect(arr[1].className.trim()).toBe('mdl-grid')
            });
        });
    });
});
