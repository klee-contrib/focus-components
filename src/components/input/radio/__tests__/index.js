
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Radio from '../';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate } = TestUtils;

describe('Input Radio Component', () => {
    describe('Rendering', () => {
        describe('When a default radio is rendered', () => {
            let renderedRadio;
            beforeEach(() => {
                renderedRadio = renderIntoDocument(<Radio label="My value" />);
            });
            it('should have its default props', () => {
                expect(renderedRadio.props.value).toBe(false);
            });
            it('should have its default state', () => {
                expect(renderedRadio.state.isChecked).toBe(false);
            });
            describe('The function getValue', () => {
                let renderedRadio;
                beforeEach(() => {
                    renderedRadio = renderIntoDocument(<Radio />);
                });
                it('should return a boolean', () => {
                    expect(renderedRadio.getValue()).toBeInstanceOf(Boolean);
                });
                it('should return false', () => {
                    expect(renderedRadio.getValue()).toBe(false);
                });
            });
        });
        describe('When the radio is selected', () => {
            let renderedRadio;
            beforeEach(() => {
                renderedRadio = renderIntoDocument(<Radio label="My value" />);
                Simulate.change(renderedRadio.refs.inputRadio);
            });
            it('should change the state', () => {
                expect(renderedRadio.state.isChecked).toBe(true);
            });
        })
    });
});
