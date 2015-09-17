import InputCheckBox from '../';

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElements: sinon.stub()
};

describe('The input checkbox', () => {
    describe('when mounted', () => {
        let renderedTest;
        const onChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox onChange={onChangeSpy} value={true} />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).to.equal(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        let checkbox;
        const onChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox onChange={onChangeSpy} value={false} />);
            checkbox = ReactDOM.findDOMNode(renderedTest.refs.checkbox);
            TestUtils.Simulate.change(checkbox, {target: {checked: true}});
        });

        it('should call the handeOnChange prop', () => {
            expect(onChangeSpy).to.be.called.once;
        });

        it('should not change the checkbox value if the parent does not explicitly change it', () => {
            expect(renderedTest.getValue()).to.equal(false);
        });
    });
});
