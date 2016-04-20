import SelectRadio from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

const values = [
    {code: 'A', label: 'Value A'}, {code: 'B', label: 'Value B'}, {code: 'C', label: 'Value C'}
];

describe.only('Select Radio Component', () => {
    describe('Rendering', () => {
        describe('When a default select-radio is rendered', () => {
            let renderedSelectRadio;
            before(() => {
                renderedSelectRadio = renderIntoDocument(<SelectRadio value='B' values={values} />);
            });
            it('should have its default state value equals to the props value', () => {
                expect(renderedSelectRadio.state.value).to.equal(renderedSelectRadio.props.value)
            });
        });
        describe('When a radio is selected', () => {
            let renderedSelectRadio, arr, initalValueState;
            before(() => {
                renderedSelectRadio = renderIntoDocument(<SelectRadio value='B' values={values} />);
                arr = scryRenderedDOMComponentsWithTag(renderedSelectRadio, 'input')
                initalValueState = renderedSelectRadio.state.value;
                Simulate.change(arr[2]);
            });
            it('should change the state value', () => {
                expect(renderedSelectRadio.state).to.not.equal(initalValueState);
            });
            it('should check the radio', () => {
                expect(arr[2].value).to.equal('true');
            });
        });
    });
});
