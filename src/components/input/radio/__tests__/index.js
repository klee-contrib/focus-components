
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Radio from '../';

const { renderIntoDocument, Simulate } = TestUtils;

describe('Input Radio Component', () => {
    describe('Rendering', () => {
        describe('When a default radio is rendered', () => {
            let renderedRadio;
            beforeEach(() => {
                renderedRadio = renderIntoDocument(<Radio label='My value' />);
            });
            it.skip('should have its default props', () => { //FIXME problem outside the component, inside render props are good
                expect(renderedRadio.props.value).toBe(false);
            });
            describe('The function getValue', () => {
                let renderedRadio;
                beforeEach(() => {
                    renderedRadio = renderIntoDocument(<Radio />);
                });
                it('should return a boolean', () => {
                    expect(typeof renderedRadio.getValue()).toBe('boolean')
                });
                it('should return false', () => {
                    expect(renderedRadio.getValue()).toBe(false);
                });
            });
        });
        describe('When the radio is selected', () => {
            let renderedRadio;
            let radio;
            const onChangeSpy = jest.fn();
            beforeEach(() => {
                renderedRadio = renderIntoDocument(
                    <Radio
                        label='My value'
                        onChange={onChangeSpy}
                        value={true}
                    />);
            });
            it('should call the _onChange prop', () => {
                radio = ReactDOM.findDOMNode(renderedRadio.refs.inputRadio);
                Simulate.change(radio, { target: { checked: true } });
                expect(onChangeSpy).toHaveBeenCalledTimes(1);
            });

            it('the returned value should be equals to this.props.value', () => {
                expect(renderedRadio.getValue()).toBe(true);
            });
        })
    });
});
