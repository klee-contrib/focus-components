import Input from '../';
const {renderIntoDocument, Simulate} = TestUtils;
describe.only('The input text', () => {
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

});
