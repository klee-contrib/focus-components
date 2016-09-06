import { mount, render } from 'enzyme';
import {init, translate} from 'focus-core/translation';
import Dropdown from '../';

const actionSpy = sinon.spy();
const operations = [
    {label: "action_a", action: actionSpy},
    {label: "action_b", action: actionSpy},
    {label: "action_c", action: actionSpy},
    {label: "action_d", action: actionSpy},
];

init({resStore: {dev: {translation: {}}}}, () => {
    describe.only('<Dropdown />', () => {
        describe('when has only operations props', () => {
            const wrapper = mount(<Dropdown operations={operations} />);
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
                const wrapper = mount(<Dropdown operations={[{label: "action_a", action: actionSpy}]} />);
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
                const operationsNode = rootNode.find('ul li');
                expect(operationsNode).to.have.length(operations.length);
                operationsNode.map(node => {
                    expect(node.hasClass('mdl-menu__item')).to.be.true;
                });
            });
            it('should render all operations with MDL classes', () => {
                const operationsNode = rootNode.find('ul li');
                operationsNode.map(node => {
                    expect(node.hasClass('mdl-menu__item')).to.be.true;
                });
            });
            it('should render all operations', () => {
                const operationsNode = rootNode.find('ul li');
                expect(operationsNode.at(0).text()).to.equal(operations[0].label);
                expect(operationsNode.at(1).text()).to.equal(operations[1].label);
                expect(operationsNode.at(2).text()).to.equal(operations[2].label);
                expect(operationsNode.at(3).text()).to.equal(operations[3].label);
            });
            it('should be possible to click on each operation', () => {
                const operationsNode = rootNode.find('ul li');
                let count = 0;
                operationsNode.map(node => {
                    node.simulate('click');
                    count++;
                    expect(actionSpy).to.have.property('callCount', count);
                    expect(actionSpy).to.have.been.calledWith();
                });
            });
            it(`should render default position { vertical: 'bottom', horizontal: 'left' }`, () => {
                const wrapper = mount(<Dropdown operations={[{label: "action_a", action: actionSpy}]} />);
                const ulNode = wrapper.find('[data-focus="dropdown"] ul');
                expect(ulNode.hasClass('mdl-menu--bottom-left')).to.be.true;
            });
        });
        describe('when has position props', () => {
            it('should render dropdown with vertical position attribute', () => {
                const position = { vertical: 'top', horizontal: 'right' };
                const exepctedClass = `mdl-menu--${position.vertical}-${position.horizontal}`;
                const wrapper = mount(<Dropdown operations={[{label: "action_a", action: actionSpy}]} position={position} />);
                const ulNode = wrapper.find('[data-focus="dropdown"] ul');
                expect(ulNode.hasClass(exepctedClass)).to.be.true;
            });
        });
        describe('when has button shape props', () => {
            it('should render button with the good shape and good icon', () => {
                const buttonProps = { icon: 'cancel', shape: 'fab' };
                const wrapper = mount(<Dropdown operations={[{label: "action_a", action: actionSpy}]} button={buttonProps} />);
                const buttonNode = wrapper.find('[data-focus="dropdown"] button');
                expect(buttonNode.hasClass(`mdl-button--${buttonProps.shape}`)).to.be.true;
                const icon = buttonNode.find('i');
                expect(buttonNode.text()).to.equal(buttonProps.icon);
            });
        });
    });
});
