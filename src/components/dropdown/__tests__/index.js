import { mount, render } from 'enzyme';
import {init, translate} from 'focus-core/translation';
import Dropdown from '../';

const actionSpy = sinon.spy();
const operationList = [
    {label: "action_a", action: actionSpy},
    {label: "action_b", action: actionSpy},
    {label: "action_c", action: actionSpy},
    {label: "action_d", action: actionSpy},
];

init({resStore: {dev: {translation: {}}}}, () => {
    describe('<Dropdown />', () => {
        describe('when has only operationList props', () => {
            const wrapper = mount(<Dropdown operationList={operationList} />);
            const rootNode = wrapper.find('[data-focus="dropdown"]');
            it('should have attribure [data-focus="dropdown"]', () => {
                expect(rootNode).to.exist;
            });
            it('should render a button with MDL classes', () => {
                const button = rootNode.find('button');
                expect(button).to.exist;
                expect(button.hasClass('mdl-button')).to.be.true;
            });
            it(`should render button with default props buttonProps: { icon: 'more_vert', shape: 'icon' }`, () => {
                const wrapper = mount(<Dropdown operationList={[{label: "action_a", action: actionSpy}]} />);
                const buttonNode = wrapper.find('[data-focus="dropdown"] button');
                expect(buttonNode.hasClass('mdl-button--icon')).to.be.true;
                const icon = buttonNode.find('i');
                expect(buttonNode.text()).to.equal('more_vert');
            });
            it('should render an UL node with MDL classes', () => {
                const list = rootNode.find('ul');
                expect(list).to.exist;
                expect(list.hasClass('mdl-menu')).to.be.true;
            });
            it('should render the good number of operations', () => {
                const operations = rootNode.find('ul li');
                expect(operations).to.have.length(operationList.length);
                operations.map(node => {
                    expect(node.hasClass('mdl-menu__item')).to.be.true;
                });
            });
            it('should render all operations with MDL classes', () => {
                const operations = rootNode.find('ul li');
                operations.map(node => {
                    expect(node.hasClass('mdl-menu__item')).to.be.true;
                });
            });
            it('should render all operations', () => {
                const operations = rootNode.find('ul li');
                expect(operations.at(0).text()).to.equal(operationList[0].label);
                expect(operations.at(1).text()).to.equal(operationList[1].label);
                expect(operations.at(2).text()).to.equal(operationList[2].label);
                expect(operations.at(3).text()).to.equal(operationList[3].label);
            });
            it('should be possible to click on each operation', () => {
                const operations = rootNode.find('ul li');
                let count = 0;
                operations.map(node => {
                    node.simulate('click');
                    count++;
                    expect(actionSpy).to.have.property('callCount', count);
                    expect(actionSpy).to.have.been.calledWith();
                });
            });
            it(`should render default position { vertical: 'bottom', horizontal: 'left' }`, () => {
                const wrapper = mount(<Dropdown operationList={[{label: "action_a", action: actionSpy}]} />);
                const ulNode = wrapper.find('[data-focus="dropdown"] ul');
                expect(ulNode.hasClass('mdl-menu--bottom-left')).to.be.true;
            });
        });
        describe('when has position props', () => {
            it('should render dropdown with vertical position attribute', () => {
                const position = { vertical: 'top', horizontal: 'right' };
                const exepctedClass = `mdl-menu--${position.vertical}-${position.horizontal}`;
                const wrapper = mount(<Dropdown operationList={[{label: "action_a", action: actionSpy}]} position={position} />);
                const ulNode = wrapper.find('[data-focus="dropdown"] ul');
                expect(ulNode.hasClass(exepctedClass)).to.be.true;
            });
        });
        describe('when has button shape props', () => {
            it('should render button with the good shape and good icon', () => {
                const buttonProps = { icon: 'cancel', shape: 'fab' };
                const wrapper = mount(<Dropdown operationList={[{label: "action_a", action: actionSpy}]} button={buttonProps} />);
                const buttonNode = wrapper.find('[data-focus="dropdown"] button');
                expect(buttonNode.hasClass(`mdl-button--${buttonProps.shape}`)).to.be.true;
                const icon = buttonNode.find('i');
                expect(buttonNode.text()).to.equal(buttonProps.icon);
            });
        });
    });
});



// const ReactDOM = require('react-dom');
// //import user from 'focus-core/user';
// import Dropdown from '../';
//
// const {renderIntoDocument,findRenderedDOMComponentWithClass} = TestUtils;
//
// const alertSpy = sinon.spy();
//
// const actions = [
//     {label: "Action_a", msg: "Action a"},
//     {label: "Action_b", msg: "Action b"},
//     {label: "Action_c", msg: "Action c"},
//     {label: "Action_d", msg: "Action d"},
// ];
//
// const operationList = actions.map(({label, msg}) => ({label:label , action: () => alertSpy({msg:msg})}));
//
// class TestComponent extends React.Component {
//     render() {
//         const {rolesForHasOne,rolesForHasAll, ...otherProps} = this.props;
//         return (
//                 <Dropdown operationList={operationList} position="left" iconProps={{name: 'apps'}} shape="raised"
//                           ref="testedCpt"/>
//         );
//     }
// }
//
// describe.skip('The dropdown component', () => {
//     describe
//     ('when dropdown is rendered', () => {
//
//         let renderedTest;
//         before(
//             () => {
//                 renderedTest = renderIntoDocument(<TestComponent />);
//             }
//         );
//         it('component is rendered', () => {
//             const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
//             expect(ReactDOM.findDOMNode(renderedTest)).not.to.equal(null);
//         });
//
//         it('children are rendered', () => {
//             const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
//             expect(listCpt.children.length).to.equal(operationList.length);
//         });
//
//         it('shape is rendered', () => {
//             const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
//             expect(buttonCpt.getAttribute('class').indexOf('mdl-button--raised')).not.to.equal(-1);
//         });
//         it('icon is rendered', () => {
//             const buttonCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'button');
//             const icon = buttonCpt.getElementsByTagName('i')[0];
//             expect(icon.textContent).to.equal('apps');
//         })
//
//         it('action is called', () => {
//             const listCpt = TestUtils.findRenderedDOMComponentWithTag(renderedTest, 'ul');
//             TestUtils.Simulate.click(listCpt.children[0]);
//             expect(alertSpy).to.have.been.calledOnce;
//             const [selectedAction, ...otherActions] = actions;
//             expect(alertSpy).to.have.been.calledWith({msg: selectedAction.msg});
//             otherActions.forEach(action => expect(alertSpy).not.to.have.been.calledWith({msg: action.msg}));
//         })
//     });
// });
