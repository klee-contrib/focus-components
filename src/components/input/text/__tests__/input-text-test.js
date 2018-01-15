
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Input from '../';
const { renderIntoDocument, Simulate } = TestUtils;
import identity from 'lodash/utility/identity';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

describe('The input text', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('when called with no props', () => {
        let component, domNode;
        beforeEach(
            () => {
                component = renderIntoDocument(<Input name='inputName' onChange={(value) => { return; }} />);
                domNode = ReactDOM.findDOMNode(component);
            }
        );
        it('should render an empty input', () => {
            // expect(component).toBeInstanceOf(Object);
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.className).toMatch('mdl-textfield mdl-js-textfield');
        });
    });
    describe('when called with minimal props', () => {
        let component, domNode, onChangeSpy;
        beforeEach(
            () => {
                onChangeSpy = jest.fn();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy} />);
                domNode = ReactDOM.findDOMNode(component);
            }
        );
        it('should render an empty input', () => {
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.className).toMatch('mdl-textfield mdl-js-textfield');
        });

    });
    describe('when a value is provided', () => {
        let component, onChangeSpy;
        const value = 'testValue';
        beforeEach(
            () => {
                onChangeSpy = jest.fn();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy} value={value} />);
            }
        );
        it('shoud return the value on getValue call', () => {
            expect(component.getValue()).toBe(value);
        });
        it('should render the value in the DOM', () => {
            expect(ReactDOM.findDOMNode(component.refs.htmlInput).value).toBe(value);
        });

    });
    describe('when a text is typed', () => {
        let component, onChangeSpy;
        const testValue = 'MY_TEST_VALUE';
        beforeEach(
            () => {
                onChangeSpy = jest.fn();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy} />);

            }
        );
        it('should call onChange with the new value', () => {
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlInput), { target: { value: testValue } });
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(testValue);
        });
    });
    describe('when a formatter is provided', () => {
        let component, htmlInput, onChange, isEditFormatterSpy;
        const testValue = 'MY_TEST_VALUE';
        const formatedValue = 'MY_FORMATED_VALUE';
        beforeEach(
            () => {
                onChange = identity;
                isEditFormatterSpy = jest.fn();
                /**
                 * The formatter test.
                 * @return {string} - The formated value
                 */
                function formatter(value, mode) { isEditFormatterSpy(mode); return formatedValue; } // eslint-disable-line
                component = renderIntoDocument(<Input formatter={formatter} name='inputName' onChange={onChange} value={testValue} />);
                htmlInput = ReactDOM.findDOMNode(component.refs.htmlInput);

            }
        );
        it('should format the value in the DOM', () => {
            expect(htmlInput.value).toBe(formatedValue);
        });
        it('should call the isEdit formatter with the mode', () => {
            expect(isEditFormatterSpy).toHaveBeenCalledTimes(1);
            expect(isEditFormatterSpy).toHaveBeenCalledWith({ isEdit: true });
        });
    });
    describe('when an unformatter is provided', () => {
        let component, onChange, unFormatterSpy, componentValue;
        const testValue = 'MY_TEST_VALUE';
        const unformatedValue = 'MY_UN_FORMATED_VALUE';
        beforeEach(
            () => {
                unFormatterSpy = jest.fn();
                onChange = identity;
                /**
                 * The unformatter test.
                 * @return {string} - The formated value
                 */
                function unformatter(value, mode) { unFormatterSpy(mode); return unformatedValue; }//eslint-disable-line
                component = renderIntoDocument(<Input name='inputName' onChange={onChange} unformatter={unformatter} value={testValue} />);
                componentValue = component.getValue();
            }
        );
        it('should unformat the getValue', () => {
            expect(componentValue).toBe(unformatedValue);
        });
        it('should call unformatter with mode', () => {
            expect(unFormatterSpy).toHaveBeenCalledTimes(1);
            expect(unFormatterSpy).toHaveBeenCalledWith({ isEdit: true });
        });
    });
    describe('when an error is provided', () => {
        let component, onChange, htmlInput, htmlError;
        const testValue = 'MY_TEST_VALUE';
        const error = 'MY_ERROR';
        beforeEach(
            () => {
                onChange = identity;
                component = renderIntoDocument(<Input error={error} name='inputName' onChange={onChange} value={testValue} />);
                htmlInput = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
                htmlError = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
            }
        );
        it('should display the error in the HTML', () => {
            expect(htmlError).toBeDefined();
            expect(htmlError.innerHTML).toBe(error);
        });
        it('input should have a pattern attribute', () => {
            expect(htmlInput).toBeDefined();
            expect(htmlInput.getAttribute('pattern')).toBe('hasError');
        });
    });

});
