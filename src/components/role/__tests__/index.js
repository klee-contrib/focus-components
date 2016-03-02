const React = require('react/addons');
const ReactDOM = require('react-dom');
const TestUtils = React.addons.TestUtils;
import user from 'focus-core/user';
import Role from '../';
import Input from '../../input/text';

const CHILD_NOT_FOUND_MSG = 'Did not find exactly one match (found: 0) for class:child';
const childBlock = 'childBlock';

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
                <Role  hasOne={rolesForHasOne} hasAll={rolesForHasAll} emptyBlock={<div/>}>
                    <TestWrapper mockedValue={childBlock}>
                        <div>Test</div>
                    </TestWrapper>
                </Role>
            </TestWrapper>
        );
    }
}

describe.only('The role', () => {
    describe('when user has role', () => {

        before(
            () => {
                user.setRoles(['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']);
            }
        );
        it('user has one role', () => {
            const renderedTest = TestUtils.renderIntoDocument(<TestComponent rolesForHasOne={['DEFAULT_ROLE']} />);
            expect(TestUtils.findRenderedDOMComponentWithClass(renderedTest, childBlock)).to.not.equal(null);
        })

        it('user has all the roles', () => {
            const renderedTest = TestUtils.renderIntoDocument(<TestComponent rolesForHasAll={['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']} />);
            expect(TestUtils.findRenderedDOMComponentWithClass(renderedTest, childBlock)).to.not.equal(null);
        })

    });
    describe('when user has not the role(s)', () => {

        before(
            () => {
                user.setRoles(['DEFAULT_ROLE', 'ADMIN_ROLE', 'OTHER_ROLE']);
            }
        );
        it('user has not the role ', () => {
            const renderedTest = TestUtils.renderIntoDocument(<TestComponent rolesForHasOne={['USER_ROLE']} />);
            expect(() => TestUtils.findRenderedDOMComponentWithClass(renderedTest, childBlock)).to.throw(CHILD_NOT_FOUND_MSG);
        })

        it('user has not all the roles', () => {
            const renderedTest = TestUtils.renderIntoDocument(<TestComponent rolesForHasAll={['DEFAULT_ROLE', 'ADMIN_ROLE', 'USER_ROLE']} />);
            expect(() => TestUtils.findRenderedDOMComponentWithClass(renderedTest, childBlock)).to.throw(CHILD_NOT_FOUND_MSG);
        })

    });
});
