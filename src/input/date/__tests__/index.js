import InputDate from '../';

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElements: sinon.stub()
};

describe('The input date', () => {
    describe('when mounted', () => {
        const now = new Date().toISOString();
        let renderedTest;
        const onChangeSpy = sinon.spy();
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputDate onChange={onChangeSpy} value={now} />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).to.equal(now);
        });
    });
});
