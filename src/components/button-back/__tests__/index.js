
import TestUtils from 'react-addons-test-utils';
import React from 'react';

import ButtonBack from '../';
const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = TestUtils;

const Wrapper = React.createClass({
    render: function() {
        return (
            <div>{this.props.children}</div>
        );
    }
});

describe('Select ButtonBack Component', () => {
    describe('Rendering', () => {
        describe('When a default button-back is rendered', () => {
            let renderedButtonBack, arr;
            const backCallback = () => console.log('Click on back button');
            beforeEach(() => {
                renderedButtonBack = renderIntoDocument(<Wrapper><ButtonBack back={backCallback} /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedButtonBack, 'button');
            });
            it('should have the material button className', () => {
                expect(arr[0].className).toBe('mdl-button');
            });
        });
    });
});
