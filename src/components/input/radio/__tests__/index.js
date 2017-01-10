import Radio from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate} = TestUtils;

describe('Input Radio Component', () => {
    describe('Rendering', () => {
        describe('When a default radio is rendered', () => {
            let renderedRadio;
            before(() => {
                renderedRadio = renderIntoDocument(<Radio label='My value'/>);
            });
            it('should have its default props', () => {
                expect(renderedRadio.props.value).to.equal.false;
            });
            it('should have its default state', () => {
                expect(renderedRadio.state.isChecked).to.equal.false;
            });
            describe('The function getValue', () => {
                let renderedRadio;
                before(() => {
                    renderedRadio = renderIntoDocument(<Radio />);
                });
                it('should return a boolean', () => {
                    expect(renderedRadio.getValue()).to.be.a('boolean');
                });
                it('should return false', () => {
                    expect(renderedRadio.getValue()).to.equal.false;
                });
            });
        });
        describe('When the radio is selected', () => {
            let renderedRadio;
            before(() => {
                renderedRadio = renderIntoDocument(<Radio label='My value'/>);
                Simulate.change(renderedRadio.refs.inputRadio);
            });
            it('should change the state', () => {
                expect(renderedRadio.state.isChecked).to.equal.true;
            });
        })
    });
});
