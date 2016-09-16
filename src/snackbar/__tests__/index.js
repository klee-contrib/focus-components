import { mount, render } from 'enzyme';
import i18next from 'i18next';
import Snackbar from '../';

describe('<Snackbar />', () => {
    describe('when mounted', () => {
        const wrapper = mount(<Snackbar />);
        const rootNode = wrapper.find('[data-focus="snackbar"]');
        it('should be rendered in the DOM with [data-focus="snackbar"] attribute', () => {
            expect(rootNode).to.exist;
        });
        it('should render mdl classes', () => {
            expect(rootNode.hasClass('mdl-snackbar--active')).to.be.true;
        });
        it('should render aria attributes', () => {
            const selector = {
                'aria-hidden': 'true',
                'aria-live': 'assertive',
                'aria-atomic': 'true',
                'aria-relevant': 'text'
            };
            expect(wrapper.find(selector)).to.exist;
        });
        it('should not be visible', () => {
            expect(rootNode.hasClass('mdl-snackbar--active')).to.exist;
            expect(wrapper.find({'aria-hidden': 'true'})).to.exist;
        });
    });
    describe('when the system receive', () => {
        describe('a message', () => {
            const message = 'this is a test';
            const type = 'info';
            const wrapper = render(<Snackbar content={message} type="info" />);
            const rootNode = wrapper.find('[data-focus="snackbar"]');
            it('should be visible', () => {
                expect(rootNode).to.exist;
                expect(rootNode.hasClass('mdl-snackbar--active')).to.be.true;
                expect(wrapper.find({'aria-hidden': 'false'})).to.exist;
            });
            it('should display the sent message', () => {
                const textNode = rootNode.find('.mdl-snackbar__text');
                expect(textNode).to.exist;
                expect(textNode.text()).to.equal(i18next.t(message));
            });
            it.skip('should should not display action', () => {
                expect(rootNode.find('button.mdl-snackbar__action')).to.nbt.exist;
            });
            it('should have type property', () => {
                expect(wrapper.find('[data-message-type="info"]')).to.exist;
            });
        });
        // describe('a message with an action', () => {
        //     const message = 'This is a message with action';
        //     const actionText = 'Action';
        //     let reactComponent, domNode;
        //     after(() => {
        //         unmountComponentAtNode(findDOMNode(reactComponent).parentNode);
        //     });
        //     before(() => {
        //         const MessageCenterComponent = <MessageCenter />;
        //         reactComponent = renderIntoDocument(MessageCenterComponent);
        //         domNode = findDOMNode(reactComponent);
        //     });
        //     before(() => {
        //         const messageWithAction = {
        //             content: message,
        //             action: {
        //                 text: actionText,
        //                 handler: () => console.log('Clicked !')
        //             }
        //         }
        //         addInformationMessage(messageWithAction);
        //     });
        //     it('should be visible', () => {
        //         expect(reactComponent).to.exist;
        //         expect(domNode.getAttribute('class')).to.contain('mdl-snackbar--active');
        //         expect(domNode.getAttribute('aria-hidden')).to.equal('true');
        //     });
        //     it('should display the sent message', () => {
        //         const messageContent = domNode.querySelector('.mdl-snackbar__text');
        //         expect(messageContent).to.exist;
        //         expect(messageContent.tagName).to.equal('DIV');
        //         expect(messageContent.innerHTML).to.equal(message);
        //     });
        //     it('should should display the action', () => {
        //         const actionContent = domNode.querySelector('.mdl-snackbar__action');
        //         expect(actionContent).to.exist;
        //         expect(actionContent.tagName).to.equal('BUTTON');
        //         expect(actionContent.getAttribute('type')).to.equal('button');
        //         //expect(actionContent.getAttribute('onClick')).not.to.be.null;
        //         //expect(actionContent.getAttribute('onclick')).to.be.a('function');
        //         expect(actionContent.innerHTML).to.equal(actionText);
        //     });
        //     it.skip('should trigger function on click on action');
        // });
    });
});
