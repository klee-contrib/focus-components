import Button from '../';
const {renderIntoDocument, Simulate} = TestUtils;

describe('Button Component', () => {
    describe('Rendering', () => {
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
                expect(hasRipple).to.be.false;
                expect(type).to.equal('submit');
                expect(iconLibrary).to.equal('material');
            });
        });
        describe('When a configured button is rendered', () => {
            describe('When we give hasRipple prop to true', () => {
                let renderedButton;
                before(() => {
                    renderedButton = renderIntoDocument(<Button hasRipple/>);
                });
                it('should give add the material mention in the className', () => {
                    const {hasRipple} = renderedButton.props;
                    const {materialButton} = renderedButton.refs;
                    expect(hasRipple).to.be.true;
                    expect(materialButton.className).to.equal('mdl-button  mdl-button--raised  mdl-js-ripple-effect');
                });
            });
            describe('When we set the shape props to "FAB"', () => {
                let renderedButton;
                before(() => {
                    renderedButton = renderIntoDocument(<Button shape='fab'/>);
                });
                it('should give add the fab mention in the className', () => {
                    const {materialButton} = renderedButton.refs;
                    expect(materialButton.className).to.equal('mdl-button  mdl-button--fab');
                });
            });
        });
        describe('When we set a processingLabel', () => {
            let renderedButton;
            describe('When isLoading props is false', () => {
                before(() => {
                    renderedButton = renderIntoDocument(<Button label='SAVE' processLabel='Loading' isLoading={false} />);
                });
                it('should render the default label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).to.equal(renderedButton.props.label);
                });
                it('should not render the process label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).to.not.equal(renderedButton.props.processLabel);
                });
            });
            describe('When isLoading props is true', () => {
                before(() => {
                    renderedButton = renderIntoDocument(<Button label='SAVE' processLabel='Loading' isLoading />);
                });
                it('should render the process label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).to.equal(renderedButton.props.processLabel);
                });
                it('should not render the default label', () => {
                    const buttonLabel = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="button-label"]').innerHTML;
                    expect(buttonLabel).to.not.equal(renderedButton.props.label);
                });
                it('should have a spinner', () => {
                    const spinner = ReactDOM.findDOMNode(renderedButton).querySelector('[data-focus="double-action-button-spinner"]');
                    expect(spinner).to.not.be.null;
                    expect(spinner).to.not.be.undefined;
                });
            });
        });
    });
});
