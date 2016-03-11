const ReactDOM = require('react-dom');
import IconDropDown from '../';

const {renderIntoDocument,findRenderedDOMComponentWithClass} = TestUtils;
import * as TestFocus from  './test-focus.jsx';

const alertSpy = sinon.spy();

const actions = [
    {label: "Action_a", msg: "Action a"},
    {label: "Action_b", msg: "Action b"},
    {label: "Action_c", msg: "Action c"},
    {label: "Action_d", msg: "Action d"},
];

const operationList = actions.map(({label, msg}) => ({label:label , action: () => alertSpy({msg:msg})}));

function isButtonRendered(renderedTest) {
    return (TestFocus.findFocusElementsWithDataFocus(renderedTest, TestFocus.VAL_DATA_FOCUS_BUTTON).length == 1);
}

function isMenuRendered(renderedTest) {
    return (TestFocus.findFocusElementsWithDataFocus(renderedTest, TestFocus.VAL_DATA_FOCUS_MENU).length == 1);
}

describe.only('The icon-dropdown component', () => {
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
            const [selectedAction,...otherActions] = actions;
            expect(alertSpy).to.have.been.calledWith({msg: selectedAction.msg});
            otherActions.forEach(action => expect(alertSpy).not.to.have.been.calledWith({msg: action.msg}));
        });

    });

});
