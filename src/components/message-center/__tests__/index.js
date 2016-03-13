import MessageCenter from '../';
import {findDOMNode, unmountComponentAtNode} from 'react-dom';
import {addErrorMessage, addWarningMessage, addInformationMessage, addSuccessMessage} from 'focus-core/message';

const {findRenderedDOMComponentWithClass, renderIntoDocument, Simulate} = TestUtils;

describe.only('The MessageCenter', () => {
    describe('when mounted', () => {
        let reactComponent, domNode;
        after(() => {
            unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
        });
        before(() => {
            const MessageCenterComponent = <MessageCenter />;
            reactComponent = renderIntoDocument(MessageCenterComponent);
            domNode = findDOMNode(reactComponent);
        });
        it('should be rendered in the DOM', () => {
            expect(reactComponent).to.exist;
            expect(reactComponent).to.be.an('object');
            expect(domNode.tagName).to.equal('DIV');
        });
        it('should render data-focus attribute', () => {
            expect(domNode.getAttribute('data-focus')).to.equal('snackbar-message-center');
        });
        it('should render mdl classes', () => {
            expect(domNode.getAttribute('class')).to.contain('mdl-snackbar');
            expect(domNode.getAttribute('class')).not.to.contain('mdl-snackbar--active');
        });
        it('should render aria attributes', () => {
            expect(domNode.getAttribute('aria-hidden')).to.equal('false');
            expect(domNode.getAttribute('aria-live')).to.equal('assertive');
            expect(domNode.getAttribute('aria-atomic')).to.equal('true');
            expect(domNode.getAttribute('aria-relevant')).to.equal('text');
        });
        it('should not be visible', () => {
            expect(domNode.getAttribute('class')).not.to.contain('mdl-snackbar--active');
            expect(domNode.getAttribute('aria-hidden')).to.equal('false');
        });
    });
    describe('when the system receive', () => {
        describe('an informative message', () => {
            const message = 'this is a test';
            let reactComponent, domNode;
            after(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            before(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            before(() => {
                addInformationMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).to.exist;
                expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).to.equal('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).to.exist;
                expect(messageContent.tagName).to.equal('DIV');
                expect(messageContent.innerHTML).to.equal(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).not.to.exist;
            });
        });
        describe('an error message', () => {
            const message = 'this is an error';
            let reactComponent, domNode;
            after(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            before(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            before(() => {
                addErrorMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).to.exist;
                expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).to.equal('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).to.exist;
                expect(messageContent.tagName).to.equal('DIV');
                expect(messageContent.innerHTML).to.equal(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).not.to.exist;
            });
        });
        describe('a success message', () => {
            const message = 'this is a success';
            let reactComponent, domNode;
            after(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            before(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            before(() => {
                addSuccessMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).to.exist;
                expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).to.equal('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).to.exist;
                expect(messageContent.tagName).to.equal('DIV');
                expect(messageContent.innerHTML).to.equal(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).not.to.exist;
            });
        });
        describe('a warning message', () => {
            const message = 'this is a warning';
            let reactComponent, domNode;
            after(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            before(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            before(() => {
                addWarningMessage(message);
            });
            it('should be visible', () => {
                expect(reactComponent).to.exist;
                expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).to.equal('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).to.exist;
                expect(messageContent.tagName).to.equal('DIV');
                expect(messageContent.innerHTML).to.equal(message);
            });
            it('should should not display action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).not.to.exist;
            });
        });
        describe('a message with an action', () => {
            const message = 'This is a message with action';
            const actionText = 'Action';
            let reactComponent, domNode;
            after(() => {
                unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
            });
            before(() => {
                const MessageCenterComponent = <MessageCenter />;
                reactComponent = renderIntoDocument(MessageCenterComponent);
                domNode = findDOMNode(reactComponent);
            });
            before(() => {
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
                expect(reactComponent).to.exist;
                expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
                expect(domNode.getAttribute('aria-hidden')).to.equal('true');
            });
            it('should display the sent message', () => {
                const messageContent = domNode.querySelector('.mdl-snackbar__text');
                expect(messageContent).to.exist;
                expect(messageContent.tagName).to.equal('DIV');
                expect(messageContent.innerHTML).to.equal(message);
            });
            it('should should display the action', () => {
                const actionContent = domNode.querySelector('.mdl-snackbar__action');
                expect(actionContent).to.exist;
                expect(actionContent.tagName).to.equal('BUTTON');
                expect(actionContent.getAttribute('type')).to.equal('button');
                //expect(actionContent.getAttribute('onClick')).not.to.be.null;
                //expect(actionContent.getAttribute('onclick')).to.be.a('function');
                expect(actionContent.innerHTML).to.equal(actionText);
            });
            it.skip('should trigger function on click on action');
        });
    });
});
