
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

const { renderIntoDocument, Simulate } = TestUtils;

describe('Button Component', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('Rendering', () => {
        describe('When a default button is rendered', () => {
            let renderedButton;
            beforeEach(() => {
                renderedButton = renderIntoDocument(<Button />);
            });
            it('should have the default props', () => {
                const { type, shape, label, icon, id, hasRipple, isJs, iconLibrary } = renderedButton.props;
                expect(type).toBe('submit');
                expect(shape).toBe('raised');
                expect(label).toBe('');
                expect(icon).toBeNull();
                expect(id).toBeUndefined();
                expect(hasRipple).toBe(false);
                expect(type).toBe('submit');
                expect(iconLibrary).toBe('material');
            });
        });
        describe('When a configured button is rendered', () => {
            describe('When we give hasRipple prop to true', () => {
                let renderedButton;
                beforeEach(() => {
                    renderedButton = renderIntoDocument(<Button hasRipple />);
                });
                it('should give add the material mention in the className', () => {
                    const { hasRipple } = renderedButton.props;
                    const { materialButton } = renderedButton.refs;
                    expect(hasRipple).toBe(true);
                    expect(materialButton.className).toBe('mdl-button  mdl-button--raised  mdl-js-ripple-effect');
                });
            });
            describe('When we set the shape props to "FAB"', () => {
                let renderedButton;
                beforeEach(() => {
                    renderedButton = renderIntoDocument(<Button shape='fab' />);
                });
                it('should give add the fab mention in the className', () => {
                    const { materialButton } = renderedButton.refs;
                    expect(materialButton.className).toBe('mdl-button  mdl-button--fab');
                });
            });
        });
        describe('When we set a processingLabel', () => {
            let renderedButton;
            describe('When isLoading props is false', () => {
                beforeEach(() => {
                    renderedButton = renderIntoDocument(<Button label='SAVE' processLabel='Loading' isLoading={false} />);
                });
                it('should render the default label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).toBe(renderedButton.props.label);
                });
                it('should not render the process label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).not.toBe(renderedButton.props.processLabel);
                });
            });
            describe('When isLoading props is true', () => {
                beforeEach(() => {
                    renderedButton = renderIntoDocument(<Button label='SAVE' processLabel='Loading' isLoading />);
                });
                it('should render the process label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).toBe(renderedButton.props.processLabel);
                });
                it('should not render the default label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).not.toBe(renderedButton.props.label);
                });
                it('should have a spinner', () => {
                    const spinner = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="double-action-button-spinner"]');
                    expect(spinner).not.toBeNull();
                    expect(spinner).not.toBeUndefined();
                });
            });
        });
    });
});
