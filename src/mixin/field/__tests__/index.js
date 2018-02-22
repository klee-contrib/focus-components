

import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { findFocusElementsWithDataFocus, findElementWithInnerHTML, findElementWithValue, TAG_DIV, TAG_INPUT } from '../../../../test/test-focus';

import { component as Field } from '../';

const { renderIntoDocument, findAllInRenderedTree } = TestUtils;

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};
const alertSpy = jest.fn();

const fieldName = 'testField';
const fieldLabel = 'label value';
const fieldValue = 'field value';
const newFieldValue = 'new value';
const fieldLabelContainer = 'field-label-container';
const fieldValueContainer = 'field-value-container';


describe('The Field component', () => {
    beforeEach(() => {
        init(i18nConfig);
    });
    describe('Field is not editable', () => {

        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit={false} label={fieldLabel} />;
        let reactComponent, domNode;


        beforeEach(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.toBe(null);
            expect(reactComponent.getValue()).toBe(fieldValue);
        });

        it('label is rendered nd not editable', () => {
            //label value
            const labelCpts = findFocusElementsWithDataFocus(reactComponent, fieldLabelContainer);
            expect(labelCpts.length).toBe(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).toBe(fieldLabel);
        });

        it('text is rendered and not editable', () => {
            //search with data-focus dependant of the component architecture
            const valueCpts = findFocusElementsWithDataFocus(reactComponent, fieldValueContainer);
            expect(valueCpts.length).toBe(1);
            const valueCpt = valueCpts[0];
            expect(valueCpt.textContent).toBe(fieldValue);
            expect(valueCpt.tagName).toBe(TAG_DIV);

            //search with text content in inner <html></html>
            const textCpts = findElementWithInnerHTML(reactComponent, fieldValue);
            expect(textCpts.length).toBe(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).toBe(TAG_DIV);
        });


    });

    describe('Field is editable', () => {
        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit label={fieldLabel} />;
        let reactComponent, domNode;


        beforeEach(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.toBe(null);
            expect(reactComponent.getValue()).toBe(fieldValue);
        });

        it('label is rendered and not editable', () => {
            //label value
            const labelCpts = findFocusElementsWithDataFocus(reactComponent, fieldLabelContainer);
            expect(labelCpts.length).toBe(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).toBe(fieldLabel);
        });

        it('text is rendered and editable', () => {
            //text value
            const valueCpts = findFocusElementsWithDataFocus(reactComponent, fieldValueContainer);
            expect(valueCpts.length).toBe(1);
            const valueCpt = valueCpts[0];

            //search with text content in inner html
            const readOnlyTextCpts = findElementWithInnerHTML(reactComponent, fieldValue);
            expect(readOnlyTextCpts.length).toBe(0);

            const textCpts = findElementWithValue(reactComponent, fieldValue);
            expect(textCpts.length).toBe(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).toBe(TAG_INPUT);
        });

        it('text is modified', () => {
            const textCpts = findElementWithValue(reactComponent, fieldValue);
            expect(textCpts.length).toBe(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.change(textCpt, { target: { value: newFieldValue } });
            expect(reactComponent.getValue()).toBe(newFieldValue);
        });

    });

    const fieldValueNumber = 3;
    const newFieldValueNumber = 10;

    describe('Field value is a number', () => {
        const testedReactCpt = <Field name={fieldName} value={fieldValueNumber} isEdit type='number' />;
        let reactComponent, domNode;

        beforeEach(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.toBe(null);
            expect(reactComponent.getValue()).toBe('' + fieldValueNumber);
        });
        it('number value is modified', () => {
            const textCpts = findElementWithValue(reactComponent, fieldValue);
            expect(textCpts.length).toBe(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.change(textCpt, { target: { value: newFieldValueNumber } });
            expect(reactComponent.getValue()).toBe('' + newFieldValueNumber);
        });
        it.skip('text value is blocked', () => {
            // FIXME don't understand how it worked before...
            const textCpts = findElementWithValue(reactComponent, fieldValue);
            expect(textCpts.length).toBe(1);
            const textCpt = textCpts[0];
            // console.log('ALLO', textCpt, fieldValue, newFieldValueNumber);
            //simulating change event
            TestUtils.Simulate.copy(textCpt, { target: { value: newFieldValueNumber } });
            expect(reactComponent.getValue()).toBe('' + newFieldValueNumber);

            TestUtils.Simulate.copy(textCpt, { target: { value: newFieldValue } });
            expect(reactComponent.getValue()).toBe('' + newFieldValueNumber);
        });
    });

    describe('Field has a formatter', () => {
        const formatter = function (data) { return data + ' formatter applied'; }
        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit={false} formatter={formatter} />;
        let reactComponent, domNode;

        beforeEach(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.toBe(null);
        });

        it('value is formatted', () => {
            const valueCpts = findFocusElementsWithDataFocus(reactComponent, fieldValueContainer);
            expect(valueCpts.length).toBe(1);
            const valueCpt = valueCpts[0];
            expect(valueCpt.textContent).toBe(formatter(fieldValue));
        });
    });
});
