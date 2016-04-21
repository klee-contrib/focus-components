import Grid from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

const Wrapper = React.createClass({
    render: function() {
        return (
            <div>{this.props.children}</div>
        );
    }
});

describe('Select Grid Component', () => {
    describe('Rendering', () => {
        describe('When a default grid is rendered', () => {
            let renderedGrid, arr;
            before(() => {
                renderedGrid = renderIntoDocument(<Wrapper><Grid /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedGrid, 'div');
            });
            it('should the default cell className', () => {
                expect(arr[1].className.trim()).to.equal('mdl-grid')
            });
        });
    });
});
