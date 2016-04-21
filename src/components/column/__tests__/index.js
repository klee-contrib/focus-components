import Column from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

const Wrapper = React.createClass({
    render: function() {
        return (
            <div>{this.props.children}</div>
        );
    }
});

describe('Select Column Component', () => {
    describe('Rendering', () => {
        describe('When a default column is rendered', () => {
            let renderedColumn, arr;
            before(() => {
                renderedColumn = renderIntoDocument(<Wrapper><Column /></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedColumn, 'div');
            });
            it('should have the default material cell className', () => {
                expect(arr[1].className.trim()).to.equal('mdl-cell mdl-cell--6-col');
            });
        });
        describe('When we give a size to the column', () => {
            let renderedColumn, arr, size;
            before(() => {
                size = 3;
                renderedColumn = renderIntoDocument(<Wrapper><Column size={size}/></Wrapper>);
                arr = scryRenderedDOMComponentsWithTag(renderedColumn, 'div');
            });
            it('should have an adapted className', () => {
                expect(arr[1].className.trim()).to.equal('mdl-cell mdl-cell--'+ size + '-col');
            });
        });
    });
});
