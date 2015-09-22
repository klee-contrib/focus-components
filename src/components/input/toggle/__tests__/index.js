import InputToggle from '../';

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElements: sinon.stub()
};

describe('The input toggle', () => {
    describe('when mounted', () => {
        let renderedTest;
        const onChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputToggle onChange={onChangeSpy} value={true} />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).to.equal(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        let toggle;
        const onChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputToggle onChange={onChangeSpy} value={false} />);
            toggle = ReactDOM.findDOMNode(renderedTest.refs.toggle);
            TestUtils.Simulate.change(toggle, {target: {checked: true}});
        });

        it('should call the handeOnChange prop', () => {
            expect(onChangeSpy).to.be.called.once;
        });

        it('should not change the toggle value if the parent does not explicitly change it', () => {
            expect(renderedTest.getValue()).to.equal(false);
        });
    });
});
