
import TestUtils from 'react-dom/test-utils';
import { init } from 'focus-core/translation';
import React from 'react';

import MessageCenter from '../index';
import ReactDOM, { findDOMNode, unmountComponentAtNode } from 'react-dom';
import { addErrorMessage, addWarningMessage, addInformationMessage, addSuccessMessage } from 'focus-core/message';

const { findRenderedDOMComponentWithClass, renderIntoDocument, Simulate } = TestUtils;

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};


describe('The MessageCenter', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('when mounted', () => {
        let reactComponent, domNode;
        afterEach(() => {
            unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
        });
        beforeEach(() => {
            const MessageCenterComponent = <MessageCenter />;
            reactComponent = renderIntoDocument(MessageCenterComponent);
            domNode = findDOMNode(reactComponent);
        });
        it('should be rendered in the DOM', () => {
            expect(reactComponent).toBeDefined();
            expect(reactComponent).toBeInstanceOf(Object);
            expect(domNode.tagName).toBe('DIV');
        });
        it('should render data-focus attribute', () => {
            expect(domNode.getAttribute('data-focus')).toBe('snackbar-message-center');
        });
        it('should render mdl classes', () => {
            expect(domNode.getAttribute('class')).toMatch('mdl-snackbar');
            expect(domNode.getAttribute('class')).not.toMatch('mdl-snackbar--active');
        });
        it('should render aria attributes', () => {
            expect(domNode.getAttribute('aria-hidden')).toBe('false');
            expect(domNode.getAttribute('aria-live')).toBe('assertive');
            expect(domNode.getAttribute('aria-atomic')).toBe('true');
            expect(domNode.getAttribute('aria-relevant')).toBe('text');
        });
        it('should not be visible', () => {
            expect(domNode.getAttribute('class')).not.toMatch('mdl-snackbar--active');
            expect(domNode.getAttribute('aria-hidden')).toBe('false');
        });
    });
    describe('when the system receive', () => {
        describe('an informative message', () => {
            const message = 'this is a test';
            let reactComponent, domNode;
            afterEach(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            beforeEach(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            beforeEach(() => {
                addInformationMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).toBeDefined();
                expect(domNode.getAttribute('class')).toMatch('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).toBe('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).toBeDefined();
                expect(messageContent.tagName).toBe('DIV');
                expect(messageContent.innerHTML).toBe(message);
            });
            it('should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).toBeNull();
            });
        });
        describe('an error message', () => {
            const message = 'this is an error';
            let reactComponent, domNode;
            afterEach(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            beforeEach(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            beforeEach(() => {
                addErrorMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).toBeDefined();
                expect(domNode.getAttribute('class')).toMatch('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).toBe('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).toBeDefined();
                expect(messageContent.tagName).toBe('DIV');
                expect(messageContent.innerHTML).toBe(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).toBeNull();
            });
        });
        describe('a success message', () => {
            const message = 'this is a success';
            let reactComponent, domNode;
            afterEach(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            beforeEach(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            beforeEach(() => {
                addSuccessMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).toBeDefined();
                expect(domNode.getAttribute('class')).toMatch('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).toBe('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).toBeDefined();
                expect(messageContent.tagName).toBe('DIV');
                expect(messageContent.innerHTML).toBe(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).toBeNull();
            });
        });
        describe('a warning message', () => {
            const message = 'this is a warning';
            let reactComponent, domNode;
            afterEach(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            beforeEach(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            beforeEach(() => {
                addWarningMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).toBeDefined();
                expect(domNode.getAttribute('class')).toMatch('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).toBe('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).toBeDefined();
                expect(messageContent.tagName).toBe('DIV');
                expect(messageContent.innerHTML).toBe(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).toBeNull();
            });
        });
        describe('a message with an action', () => {
            const message = 'This is a message with action';
            const actionText = 'Action';
            let reactComponent, domNode;
            afterEach(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            beforeEach(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            beforeEach(() => {
                const messageWithAction = {
                    content: message,
                    action: {
                        text: actionText,
                        handler: () => console.log('Clicked !')
                    }
                }
                addInformationMessage(messageWithAction);
            });
            it('should be visible', () => {
                expect(reactComponent).toBeDefined();
                expect(domNode.getAttribute('class')).toMatch('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).toBe('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).toBeDefined();
                expect(messageContent.tagName).toBe('DIV');
                expect(messageContent.innerHTML).toBe(message);
            });
            it('should should display the action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).toBeDefined();
                expect(actionContent.tagName).toBe('BUTTON');
                expect(actionContent.getAttribute('type')).toBe('button');
                //expect(actionContent.getAttribute('onClick')).not.toBeNull();
                //expect(actionContent.getAttribute('onclick')).to.be.a('function');
                expect(actionContent.innerHTML).toBe(actionText);
            });
            // it('should trigger function on click on action');
        });
    });
});
