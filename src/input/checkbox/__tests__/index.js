import InputCheckBox from '../';

describe('The input checkbox', () => {
    describe('when mounted', () => {
        let renderedTest;
        before(() => {
            class TestComponent extends React.Component {
                constructor() {
                    super();
                    this.state = {
                        checked: true
                    };
                }

                onCheckBoxChange = value => {
                    this.setState({checked: value});
                }

                render() {
                    const {checked} = this.state;
                    return (
                        <InputCheckBox handleOnChange={this.onCheckBoxChange} ref='checkbox' value={checked} />
                    );
                }
            }
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.refs.checkbox.getValue()).to.equal(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        before(() => {
            class TestComponent extends React.Component {
                constructor() {
                    super();
                    this.state = {
                        checked: false
                    };
                }

                onCheckBoxChange = value => {
                    this.setState({checked: value});
                }

                render() {
                    const {checked} = this.state;
                    return (
                        <InputCheckBox handleOnChange={this.onCheckBoxChange} ref='checkbox' value={checked} />
                    );
                }
            }
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const checkbox = ReactDOM.findDOMNode(renderedTest.refs.checkbox.refs.checkbox);
            TestUtils.Simulate.change(checkbox, {target: {checked: true}});
        });

        it('should switch the checkbox value', () => {
            expect(renderedTest.refs.checkbox.getValue()).to.equal(true);
        });
        it('should call the handeOnChange prop', () => {
            expect(renderedTest.state.checked).to.equal(true);
        });
    });
});
