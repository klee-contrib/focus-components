const ReactDOM = require('react-dom');
//import TestFocus from './test-focus.jsx';
//import user from 'focus-core/user';
import IconDropDown from '../';

const {renderIntoDocument,findRenderedDOMComponentWithClass} = TestUtils;
//import {filtreAttr,filtreAttrVal,findDataFocusElements, findDataRoleElements,findAllInRenderedTree,findFocusElementsWithDataFocus} from  './test-focus.jsx';
import * as TestFocus from  './test-focus.jsx';

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
                <IconDropDown operationList={operationList} position="left" iconProps={{name: 'apps'}} shape="raised"
                              ref="testedCpt"/>
            </TestWrapper>
        );
    }
}

function isButtonRendered(renderedTest) {
    return (TestFocus.findFocusElementsWithDataFocus(renderedTest, TestFocus.VAL_DATA_FOCUS_BUTTON).length == 1);
}

function isMenuRendered(renderedTest) {
    return (TestFocus.findFocusElementsWithDataFocus(renderedTest, TestFocus.VAL_DATA_FOCUS_MENU).length == 1);
}

describe('The icon-dropdown component', () => {
    describe('when dropdown is rendered', () => {

        const reactCpt = <IconDropDown operationList={operationList} position="left" iconProps={{name: 'apps'}}
                                       shape="raised"/>;
        let renderedTest;

        before(
            () => {
                renderedTest = renderIntoDocument(reactCpt);
            }
        );
        it('component is rendered', () => {

            //before click menu hidden
            expect(isButtonRendered(renderedTest)).to.equal(true);
            expect(isMenuRendered(renderedTest)).to.equal(false);
        });

        it('component is clicked, menu is visible', () => {
            //after click menu visible
            const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
            TestUtils.Simulate.click(buttonCpt);
            expect(isButtonRendered(renderedTest)).to.equal(true);
            expect(isMenuRendered(renderedTest)).to.equal(true);
            expect(TestFocus.findDataRoleElements(renderedTest).length).to.equal(operationList.length);
        });

        it('action is executed', () => {
            const actionCpts = TestFocus.findFocusElementsWithDataRole(renderedTest, TestFocus.VAL_DATA_ROLE_ITEM);
            TestUtils.Simulate.click(actionCpts[0]);
            expect(alertSpy).to.have.been.calledOnce;
            expect(alertSpy).to.have.been.calledWith({msg: actions[0].msg});
            for (let i of [1, 2, 3]) {
                expect(alertSpy).to.not.have.been.calledWith({msg: actions[i].msg});
            }
        });

    });

});
