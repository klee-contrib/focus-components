import InputDate from '../';
const {Component} = React;

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

    describe('when the value given as a prop changes', () => {
        let now = new Date().toISOString();
        let renderedTest;
        const onChangeSpy = sinon.spy();
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: now
                };
            }

            render() {
                return <InputDate onChange={onChangeSpy} ref='date' value={now} />;
            }
        }

        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            now = new Date().toISOString();
            renderedTest.setState({value: now});
        });

        it('should change its internal value', () => {
            expect(renderedTest.refs.date.getValue()).to.equal(now);
        });
    });
});
