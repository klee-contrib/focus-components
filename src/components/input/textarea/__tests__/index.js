import Textarea from '../';
const {findRenderedDOMComponentWithClass, renderIntoDocument, Simulate} = TestUtils;

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
        before (() => {
            reactComponent = renderIntoDocument(<Textarea name='myTextArea' onChange={fake} />);
            domNode = ReactDOM.findDOMNode(reactComponent);
            inputNode = ReactDOM.findDOMNode(reactComponent.refs.htmlInput);
        });
        it('should render a node with data-focus attribute', () => {
            expect(reactComponent).to.exist;
            expect(reactComponent).to.be.an('object');
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.getAttribute('data-focus')).to.equal('input-textarea');
        });
        it('should be material designed', () => {
            const divMdl = domNode.firstChild;
            expect(divMdl).to.exist;
            expect(divMdl.tagName).to.equal('DIV');
            expect(divMdl.className).to.equal('mdl-textfield mdl-js-textfield');
        });
        it('should have a material designed textarea', () => {
            expect(inputNode.getAttribute('class')).to.equal('mdl-textfield__input');
        });
        it('should render an empty textarea', () => {
            expect(inputNode).to.exist;
            expect(inputNode.type).to.equal('textarea');
            expect(inputNode.value).to.equal('');
            expect(() => findRenderedDOMComponentWithClass(reactComponent, 'label-error')).to.throw('Did not find exactly one match (found: 0) for class:label-error');
        });
    });
    describe('when mounted with onChange props defined', () => {
        let component, domNode, onChangeSpy;
        const testValue = 'CHANGED_VALUE';
        before(() => {
            onChangeSpy = sinon.spy(); // test that the method in props onChange is called
            component = renderIntoDocument(<Textarea name='myTextArea' onChange={onChangeSpy} />);
        });
        it('should call the onChange function defined in props when textarea is changed', () => {
            expect(onChangeSpy).to.not.have.been.called;
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlInput), {target: {value: testValue}});
            expect(onChangeSpy).to.have.been.called.once;
        });
    });
    describe('when an error is declared in props', () => {
        let component, errorComponent, inputNode;
        const errorLabel = 'this is an error';
        before(() => {
            component = renderIntoDocument(<Textarea error={errorLabel} name='myTextArea' onChange={fake} />);
            inputNode = ReactDOM.findDOMNode(component.refs.htmlInput);
            errorComponent = findRenderedDOMComponentWithClass(component, 'label-error');
        });
        it('should display the input textarea', () => {
            expect(inputNode).to.exist;
            expect(inputNode.getAttribute('pattern')).to.equal('hasError');
        });
        it('should display the error', () => {
            expect(errorComponent).to.exist;
            expect(errorComponent.innerHTML).to.equal(errorLabel);
        });
    });
});
