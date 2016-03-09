const ReactDOM = require('react-dom');
//import user from 'focus-core/user';
import Dropdown from '../';

const {renderIntoDocument,findRenderedDOMComponentWithClass} = TestUtils;

const alertSpy = sinon.spy();

const actions = [
    {label: "Action_a", msg: "Action a"},
    {label: "Action_b", msg: "Action b"},
    {label: "Action_c", msg: "Action c"},
    {label: "Action_d", msg: "Action d"},
];

const operationList = [
    {
        label: actions[0].label, action: function () {
        const alertObj = {msg: actions[0].msg};
        alertSpy(alertObj);
    }, style: "class"
    },
    {
        label: actions[1].label, action: function () {
        const alertObj = {msg: actions[1].msg};
        alertSpy(alertObj);
    }
    },
    {
        label: actions[2].label, action: function () {
        const alertObj = {msg: actions[2].msg};
        alertSpy(alertObj);
    }
    },
    {
        label: actions[3].label, action: function () {
        const alertObj = {msg: actions[3].msg};
        alertSpy(alertObj);
    }

    }
];

class TestWrapper extends React.Component {
    render() {
        const {children,mockedValue, ...otherProps} = this.props;
        return (
            <div className={mockedValue} ref={mockedValue}>{children}</div>
        );
    }
}

class TestComponent extends React.Component {
    render() {
        const {rolesForHasOne,rolesForHasAll, ...otherProps} = this.props;
        return (
            <TestWrapper mockedValue="header">
                <Dropdown operationList={operationList} position="left" iconProps={{name: 'apps'}} shape="raised"
                          ref="testedCpt"/>
            </TestWrapper>
        );
    }
}

describe('The dropdown component', () => {
    describe
    ('when dropdown is rendered', () => {

        let renderedTest;
        before(
            () => {
                renderedTest = renderIntoDocument(<TestComponent />);
            }
        );
        it('component is rendered', () => {
            const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
            expect(ReactDOM.findDOMNode(renderedTest)).to.not.equal(null);
        });

        it('children are rendered', () => {
            const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
            expect(listCpt.children.length).to.equal(operationList.length);
        });

        it('shape is rendered', () => {
            const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
            expect(buttonCpt.getAttribute('class').indexOf('mdl-button--raised')).not.to.equal(-1);
        });
        it('icon is rendered', () => {
            const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
            const icon = buttonCpt.getElementsByTagName('i')[0];
            expect(icon.textContent).to.equal('apps');
        })

        it('action is called', () => {
            const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
            TestUtils.Simulate.click(listCpt.children[0]);
            expect(alertSpy).to.have.been.calledOnce;
            expect(alertSpy).to.have.been.calledWith({msg: actions[0].msg});
            for (let i of [1, 2, 3]) {
                expect(alertSpy).to.not.have.been.calledWith({msg: actions[i].msg});
            }
        })
    });
});
