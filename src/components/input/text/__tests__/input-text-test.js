import Input from '../';
const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
describe('The input text', () => {
    describe('when called with no props', () => {
        let component;
        before(
            () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(<Input/>);
                component = shallowRenderer.getRenderOutput();
            }
        );
        it.skip('should render an empty input', () => {
            console.log('rendered', component);
            expect(component).to.be.an('object');
            expect(component.type).to.equal('div');
            expect(component.className).to.equal('mdl-textfield mdl-js-textfield');
        });
    });
    describe('when called with minimal props', () => {
        let component, domNode, onChangeSpy;
        before(
            () => {
                onChangeSpy = sinon.spy();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy}/>);
                domNode = ReactDOM.findDOMNode(component);
            }
        );
        it('should render an empty input', () => {
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.className).to.equal('mdl-textfield mdl-js-textfield');
        });

    });
    describe('when a value is provided', () => {
        let component, onChangeSpy;
        const value = 'testValue';
        before(
            () => {
                onChangeSpy = sinon.spy();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy} value={value}/>);
            }
        );
        it('shoud return the value on getValue call', () => {
            expect(component.getValue()).to.equal(value);
        });
        it('should render the value in the DOM', () => {
            expect(ReactDOM.findDOMNode(component.refs.htmlInput).value).to.equal(value);
        });

    });
    describe('when a text is typed', () => {
        let component, onChangeSpy;
        const testValue = 'MY_TEST_VALUE';
        before(
            () => {
                onChangeSpy = sinon.spy();
                component = renderIntoDocument(<Input name='inputName' onChange={onChangeSpy}/>);

            }
        );
        it('should call onChange with the new value', () => {
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlInput), {target: {value: testValue}});
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith(testValue);
        });
    });
    describe('when a formatter is provided', () => {
        let component, htmlInput, onChange;
        const testValue = 'MY_TEST_VALUE';
        const formatedValue = 'MY_FORMATED_VALUE';
        before(
            () => {
                onChange = identity;
                /**
                 * The formatter test.
                 * @return {string} - The formated value
                 */
                function formatter(){return formatedValue; }
                component = renderIntoDocument(<Input formatter={formatter} name='inputName' onChange={onChange} value={testValue}/>);
                htmlInput = ReactDOM.findDOMNode(component.refs.htmlInput);

            }
        );
        it('should format the value in the DOM', () => {
            expect(htmlInput.value).to.equal(formatedValue);
        });
    });
    describe('when an unformatter is provided', () => {
        let component, onChange;
        const testValue = 'MY_TEST_VALUE';
        const unformatedValue = 'MY_UN_FORMATED_VALUE';
        before(
            () => {
                onChange = identity;
                /**
                 * The unformatter test.
                 * @return {string} - The formated value
                 */
                function unformatter(){return unformatedValue; }
                component = renderIntoDocument(<Input name='inputName' onChange={onChange} unformatter={unformatter} value={testValue}/>);
            }
        );
        it('should unformat the getValue', () => {
            expect(component.getValue()).to.equal(unformatedValue);
        });
    });
    describe('when an error is provided', () => {
        let component, onChange, htmlInput, htmlError;
        const testValue = 'MY_TEST_VALUE';
        const error = 'MY_ERROR';
        before(
            () => {
                onChange = identity;
                component = renderIntoDocument(<Input error={error} name='inputName' onChange={onChange} value={testValue}/>);
                htmlInput = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
                htmlError = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
            }
        );
        it('should display the error in the HTML', () => {
            expect(htmlError).to.exist;
            expect(htmlError.innerHTML).to.have.string(error);
        });
        it('input should have a pattern attribute', () => {
            expect(htmlInput).to.exist;
            expect(htmlInput.getAttribute('pattern')).to.equal('hasError');
        });
    });

});
