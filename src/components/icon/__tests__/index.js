import Icon from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

const Wrapper = React.createClass({
    render: function() {
        return (
            <div>{this.props.children}</div>
        );
    }
});

describe('Select Icon Component', () => {
    describe('Rendering', () => {
        describe('When a default icon is rendered', () => {
            let renderedIcon, arr;
            before(() => {
                renderedIcon = renderIntoDocument(<Wrapper><Icon /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedIcon, 'i');
            });
            it('should have the default material icons className', () => {
                expect(arr[0].className).to.equal('material-icons');
            });
        });
        describe('When another library than material is declared', () => {
            let renderedIcon, arr;
            before(() => {
                renderedIcon = renderIntoDocument(<Wrapper><Icon library='font-awesome'/></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedIcon, 'i');
            });
            it('should not have the default material icons className', () => {
                expect(arr[0].className).to.not.equal('material-icons');
            });
            it('should not have an adapted className for the render', () => {
                expect(arr[0].className).to.not.equal('fa fa-font-awesome');
            });
        });
    });
});
