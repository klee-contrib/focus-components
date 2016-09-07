import { mount, render } from 'enzyme';
import Chips from '../';

describe('<Chips /> ', () => {
    describe('when has label props', () => {
        const label = 'This is a test';
        const wrapper = render(<Chips label={label} />);
        const rootNode = wrapper.find("[data-focus='chips']");
        it('should have [data-focus=\'chips\'] attribute', () => {
            expect(rootNode).to.exist;
        });
        it('should have MDL classes', () => {
            expect(rootNode.hasClass('mdl-chip')).to.be.true;
        });
        it('should display text', () => {
            expect(rootNode.text()).to.equal(label);
        });
    });
    describe('when has onDeleteClick props', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Chips label='This is a test' onDeleteClick={spy} />);
        const rootNode = wrapper.find("[data-focus='chips']");
        const button = rootNode.find('button');
        it('should have MDL action classes', () => {
            expect(rootNode.hasClass('mdl-chip--deletable')).to.be.true;
        });
        it('should display action button with icon', () => {
            expect(button).to.exist;
            const icon = button.find('i.material-icons');
            expect(icon).to.exist;
            expect(icon.text()).to.equal('cancel');
        });
        it('should call corresponding function when clicked', () => {
            button.simulate('click');
            expect(spy).to.have.property('callCount', 1);
            expect(spy).to.have.been.calledWith()
        });
    });
    describe('when has letter props', () => {
        const letter = 'A';
        const wrapper = render(<Chips label='This is a test' letter={letter} />);
        const rootNode = wrapper.find("[data-focus='chips']");
        const letterNode = rootNode.find('.mdl-chip__contact');
        it('should have MDL contact classes', () => {
            expect(rootNode.hasClass('mdl-chip--contact')).to.be.true;
        });
        it('should have a node span with MDL classes', () => {
            expect(letterNode).to.exist;
        });
        it('should display text', () => {
            expect(letterNode.text()).to.equal(letter);
        });
    });
});
