
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import { findFocusElementsWithDataFocus, findElementWithInnerHTML, TAG_DIV, VAL_DATA_FOCUS_BUTTON, VAL_DATA_FOCUS_MENU, findDataRoleElements, findFocusElementsWithDataRole, VAL_DATA_ROLE_DROPDOWN_ITEM } from '../../../../test/test-focus';

import IconDropDown from '../';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;
const alertSpy = jest.fn();

const actions = [
    { label: 'Action_a', msg: 'Action a' },
    { label: 'Action_b', msg: 'Action b' },
    { label: 'Action_c', msg: 'Action c' },
    { label: 'Action_d', msg: 'Action d' }
];

const operationList = actions.map(({ label, msg }) => ({ label: label, action: () => alertSpy({ msg: msg }) }));

function isButtonRendered(renderedTest) {
    return (findFocusElementsWithDataFocus(renderedTest, VAL_DATA_FOCUS_BUTTON).length == 1);
}

function isMenuRendered(renderedTest) {
    return (findFocusElementsWithDataFocus(renderedTest, VAL_DATA_FOCUS_MENU).length == 1);
}

describe('The icon-dropdown component', () => {
    describe('when dropdown is rendered', () => {

        const reactCpt = (<IconDropDown operationList={operationList} position='left' iconProps={{ name: 'apps' }} shape='raised' />);
        let renderedTest;

        beforeEach(
            () => {
                renderedTest = renderIntoDocument(reactCpt);
            }
        );
        it('component is rendered', () => {
            //before click menu hidden
            expect(isButtonRendered(renderedTest)).toBe(true);
            expect(isMenuRendered(renderedTest)).toBe(false);
        });

        it('component is clicked, menu is visible', () => {
            //after click menu visible
            const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
            TestUtils.Simulate.click(buttonCpt);
            expect(isButtonRendered(renderedTest)).toBe(true);
            expect(isMenuRendered(renderedTest)).toBe(true);
            expect(findDataRoleElements(renderedTest).length).toBe(operationList.length);
        });

        it('action is executed', () => {
            const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
            TestUtils.Simulate.click(buttonCpt);
            const actionCpts = findFocusElementsWithDataRole(renderedTest, VAL_DATA_ROLE_DROPDOWN_ITEM);
            TestUtils.Simulate.click(actionCpts[0]);
            expect(alertSpy).toHaveBeenCalledTimes(1);
            const [selectedAction, ...otherActions] = actions;
            expect(alertSpy).toHaveBeenCalledWith({ msg: selectedAction.msg });
            otherActions.forEach(action => expect(alertSpy).not.toHaveBeenCalledWith({ msg: action.msg }));
        });
    });

});
