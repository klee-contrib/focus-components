import InputCheckBox from '../';

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElement: sinon.stub()
};

describe('The input checkbox', () => {
    describe('when mounted', () => {
        let renderedTest;
        const handleOnChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox handleOnChange={handleOnChangeSpy} value={true} />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).to.equal(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        let checkbox;
        const handleOnChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox handleOnChange={handleOnChangeSpy} value={false} />);
            checkbox = ReactDOM.findDOMNode(renderedTest.refs.checkbox);
            TestUtils.Simulate.change(checkbox, {target: {checked: true}});
        });

        it('should call the handeOnChange prop', () => {
            expect(handleOnChangeSpy).to.be.called.once;
        });

        it('should not change the checkbox value if the parent does not explicitly change it', () => {
            expect(renderedTest.getValue()).to.equal(false);
        });
    });
});
