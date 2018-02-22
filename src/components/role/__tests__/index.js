
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import user from 'focus-core/user';
import Role from '../';
import Input from '../../input/text';

const CHILD_NOT_FOUND_MSG = 'Did not find exactly one match (found: 0) for class:child';
const childBlock = 'childBlock';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils

class TestWrapper extends React.Component {
    render() {
        const { children, mockedValue, ...otherProps } = this.props;
        return (
            <div className={mockedValue} ref={mockedValue}>{children}</div>
        );
    }
}

class TestComponent extends React.Component {
    render() {
        const { rolesForHasOne, rolesForHasAll, ...otherProps } = this.props;
        return (
            <TestWrapper mockedValue="header">
                <Role hasOne={rolesForHasOne} hasAll={rolesForHasAll} emptyBlock={<div />}>
                    <TestWrapper mockedValue={childBlock}>
                        <div>Test</div>
                    </TestWrapper>
                </Role>
            </TestWrapper>
        );
    }
}

describe('The role', () => {
    describe('when user has role', () => {

        beforeEach(
            () => {
                user.setRoles(['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']);
            }
        );
        it('user has one role', () => {
            const renderedTest = renderIntoDocument(<TestComponent rolesForHasOne={['DEFAULT_ROLE']} />);
            expect(findRenderedDOMComponentWithClass(renderedTest, childBlock)).not.toBe(null);
        })

        it('user has all the roles', () => {
            const renderedTest = renderIntoDocument(<TestComponent rolesForHasAll={['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']} />);
            expect(findRenderedDOMComponentWithClass(renderedTest, childBlock)).not.toBe(null);
        })

    });
    describe('when user has not the role(s)', () => {

        beforeEach(
            () => {
                user.setRoles(['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']);
            }
        );
        it('user has not the role ', () => {
            const renderedTest = renderIntoDocument(<TestComponent rolesForHasOne={['USER_ROLE']} />);
            expect(() => findRenderedDOMComponentWithClass(renderedTest, childBlock)).toThrow(CHILD_NOT_FOUND_MSG);
        })

        it('user has not all the roles', () => {
            const renderedTest = renderIntoDocument(<TestComponent rolesForHasAll={['DEFAULT_ROLE', 'ADMIN_ROLE', 'USER_ROLE']} />);
            expect(() => findRenderedDOMComponentWithClass(renderedTest, childBlock)).toThrow(CHILD_NOT_FOUND_MSG);
        })

    });
});
