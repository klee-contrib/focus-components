
import TestUtils from 'react-dom/test-utils';
import React from 'react';

const ReactDOM = require('react-dom');
//import user from 'focus-core/user';
import Dropdown from '../';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

const alertSpy = jest.fn();

const actions = [
    { label: "Action_a", msg: "Action a" },
    { label: "Action_b", msg: "Action b" },
    { label: "Action_c", msg: "Action c" },
    { label: "Action_d", msg: "Action d" },
];

const operationList = actions.map(({ label, msg }) => ({ label: label, action: () => alertSpy({ msg: msg }) }));

class TestComponent extends React.Component {
    render() {
        const { rolesForHasOne, rolesForHasAll, ...otherProps } = this.props;
        return (
            <Dropdown operationList={operationList} position="left" iconProps={{ name: 'apps' }} shape="raised"
                ref="testedCpt" />
        );
    }
}

describe('The dropdown component', () => {
    describe
        ('when dropdown is rendered', () => {

            let renderedTest;
            beforeEach(
                () => {
                    renderedTest = renderIntoDocument(<TestComponent />);
                }
            );
            it('component is rendered', () => {
                const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
                expect(ReactDOM.findDOMNode(renderedTest)).not.toBe(null);
            });

            it('children are rendered', () => {
                const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
                expect(listCpt.children.length).toBe(operationList.length);
            });

            it('shape is rendered', () => {
                const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
                expect(buttonCpt.getAttribute('class').indexOf('mdl-button--raised')).not.toBe(-1);
            });
            it('icon is rendered', () => {
                const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
                const icon = buttonCpt.getElementsByTagName('i')[0];
                expect(icon.textContent).toBe('apps');
            })

            it('action is called', () => {
                const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
                TestUtils.Simulate.click(listCpt.children[0]);
                expect(alertSpy).toHaveBeenCalledTimes(1);
                const [selectedAction, ...otherActions] = actions;
                expect(alertSpy).toHaveBeenCalledWith({ msg: selectedAction.msg });
                otherActions.forEach(action => expect(alertSpy).not.toHaveBeenCalledWith({ msg: action.msg }));
            })
        });
});
