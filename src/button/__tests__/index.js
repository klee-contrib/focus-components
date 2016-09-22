import Button from '../';
const {renderIntoDocument, Simulate} = TestUtils;

describe('<Button />', () => {
    describe('When a default button is rendered', () => {
        let renderedButton;
        before(() => {
            renderedButton = renderIntoDocument(<Button />);
        });
        it('should have the default props', () => {
            const {type, shape, label, icon, id, hasRipple, isJs, iconLibrary} = renderedButton.props;
            expect(type).to.equal('submit');
            expect(shape).to.equal('raised');
            expect(label).to.equal('');
            expect(icon).to.be.null;
            expect(id).to.equal('');
            expect(hasRipple).to.be.true;
            expect(isJs).to.be.true;
            expect(type).to.equal('submit');
            expect(iconLibrary).to.equal('material');
        });
    });
    describe('When a configured button is rendered', () => {
        describe('When we give hasRipple prop to true', () => {
            let renderedButton;
            before(() => {
                renderedButton = renderIntoDocument(<Button hasRipple={true}/>);
            });
            it('should add the material mention in the className', () => {
                const {hasRipple} = renderedButton.props;
                const {materialButton} = renderedButton.refs;
                expect(hasRipple).to.be.true;
                expect(materialButton.className).to.contain('mdl-js-ripple-effect');
            });
        });
        describe('When we give isJs prop to true', () => {
            let renderedButton;
            before(() => {
                renderedButton = renderIntoDocument(<Button isJs={true}/>);
            });
            it('should add the material mention in the className', () => {
                const {isJs} = renderedButton.props;
                const {materialButton} = renderedButton.refs;
                expect(isJs).to.be.true;
                expect(materialButton.className).to.contain('mdl-js-button');
            });
        });
        describe('When we set the shape props to "FAB"', () => {
            let renderedButton;
            before(() => {
                renderedButton = renderIntoDocument(<Button shape='fab'/>);
            });
            it('should give add the fab mention in the className', () => {
                const {materialButton} = renderedButton.refs;
                expect(materialButton.className).to.contain('mdl-button--fab');
            });
        });
    });
});
