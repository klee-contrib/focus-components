
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Textarea from '../';
const { findRenderedDOMComponentWithClass, renderIntoDocument, Simulate } = TestUtils;

function fake() {
    return () => {
        return 'fake function';
    }
}

describe('The input textarea', () => {
    describe('when mounted with no props', () => {
        let reactComponent;
        let domNode;
        let inputNode;
        beforeEach(() => {
            reactComponent = renderIntoDocument(<Textarea name='myTextArea' onChange={fake} />);
            domNode = ReactDOM.findDOMNode(reactComponent);
            inputNode = ReactDOM.findDOMNode(reactComponent.refs.htmlInput);
        });
        it('should render a node with data-focus attribute', () => {
            expect(reactComponent).toBeDefined();
            expect(reactComponent).toBeInstanceOf(Object);
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.getAttribute('data-focus')).toBe('input-textarea');
        });
        it('should be material designed', () => {
            const divMdl = domNode.firstChild;
            expect(divMdl).toBeDefined();
            expect(divMdl.tagName).toBe('DIV');
            expect(divMdl.className).toMatch('mdl-textfield mdl-js-textfield');
        });
        it('should have a material designed textarea', () => {
            expect(inputNode.getAttribute('class')).toBe('mdl-textfield__input');
        });
        it('should render an empty textarea', () => {
            expect(inputNode).toBeDefined();
            expect(inputNode.type).toBe('textarea');
            expect(inputNode.value).toBe('');
            expect(() => findRenderedDOMComponentWithClass(reactComponent, 'label-error')).toThrow('Did not find exactly one match (found: 0) for class:label-error');
        });
    });
    describe('when mounted with onChange props defined', () => {
        let component, domNode, onChangeSpy;
        const testValue = 'CHANGED_VALUE';
        beforeEach(() => {
            onChangeSpy = jest.fn(); // test that the method in props onChange is called
            component = renderIntoDocument(<Textarea name='myTextArea' onChange={onChangeSpy} />);
        });
        it('should call the onChange function defined in props when textarea is changed', () => {
            expect(onChangeSpy).not.toHaveBeenCalled();
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlInput), { target: { value: testValue } });
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('when an error is declared in props', () => {
        let component, errorComponent, inputNode;
        const errorLabel = 'this is an error';
        beforeEach(() => {
            component = renderIntoDocument(<Textarea error={errorLabel} name='myTextArea' onChange={fake} />);
            inputNode = ReactDOM.findDOMNode(component.refs.htmlInput);
            errorComponent = findRenderedDOMComponentWithClass(component, 'label-error');
        });
        it('should display the input textarea', () => {
            expect(inputNode).toBeDefined();
            expect(inputNode.getAttribute('pattern')).toBe('hasError');
        });
        it('should display the error', () => {
            expect(errorComponent).toBeDefined();
            expect(errorComponent.innerHTML).toBe(errorLabel);
        });
    });
});
