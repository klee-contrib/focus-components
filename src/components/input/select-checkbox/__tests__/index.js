import SelectCheckbox from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

const possibleValues = [
    {value: 'A', label: 'Value A'},
    {value: 'B', label: 'Value B'},
    {value: 'C', label: 'Value C'},
    {value: 'D', label: 'Value D'}
];

describe.only('Select Checkbox Component', () => {
    describe('Rendering', () => {
        describe('When a default select-checkbox is rendered', () => {
            let renderedSelectCheckbox;
            before(() => {
                renderedSelectCheckbox = renderIntoDocument(<SelectCheckbox value={['B','C']} values={possibleValues} />);
            });
            it('should have its default state selectedValues equals to the props value', () => {
                expect(renderedSelectCheckbox.props.value).to.equal(renderedSelectCheckbox.state.selectedValues);
            });
        });
    });
});
