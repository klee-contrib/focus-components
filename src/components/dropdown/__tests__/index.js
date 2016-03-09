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

const operationList = actions.map(({label, msg}) => ({label:label , action: () => alertSpy({msg:msg})}));

class TestComponent extends React.Component {
    render() {
        const {rolesForHasOne,rolesForHasAll, ...otherProps} = this.props;
        return (
                <Dropdown operationList={operationList} position="left" iconProps={{name: 'apps'}} shape="raised"
                          ref="testedCpt"/>
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
            expect(ReactDOM.findDOMNode(renderedTest)).not.to.equal(null);
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
            const [selectedAction, ...otherActions] = actions;
            expect(alertSpy).to.have.been.calledWith({msg: selectedAction.msg});
            otherActions.forEach(action => expect(alertSpy).not.to.have.been.calledWith({msg: action.msg}));
        })
    });
});
