// <div data-focus='select-mdl' ref='select' className='mdl-textfield mdl-js-textfield getmdl-select' data-valid={!error} style={style}>
//     <input placeholder={placeholder} className='mdl-textfield__input' value={currentLabel} type='text' id={name} name={name} readOnly tabIndex='-1' data-val={value} ref='htmlSelect' {...selectProps} />
//     <label htmlFor={name}>
//         <i className='mdl-icon-toggle__label material-icons'>keyboard_arrow_down</i>
//     </label>
//     <ul className='mdl-menu mdl-js-menu' htmlFor={name} ref='select'>
//         {this._renderOptions(this.props)}
//     </ul>
//     {error && <div className='label-error' ref='error'>{error}</div>}
// </div>

import { mount, render, shallow } from 'enzyme';
import {xor} from 'lodash/array';
import {isUndefined} from 'lodash/lang';
import Select from '../';

const VALUES = [
    { code: 'VALUE1', label: 'value 1' },
    { code: 'VALUE2', label: 'value 2' }
];

describe('<SelectMdl />', () => {
    describe('when called with minimal props', () => {
        const componentName ='component';
        const wrapper = mount(<Select name={componentName} onChange={sinon.spy()} values={[]} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('should have an attribute [data-focus="select-mdl"]', () => {
            expect(selectComponent).to.exist;
        });
        it('should render an input with MDL classes, id and name attribute', () => {
            expect(selectComponent.find(`input[id="${componentName}"][name="${componentName}"].mdl-textfield__input`)).to.exist;
        });
        it('should render a label with attribute for', () => {
            expect(selectComponent.find(`label[for="${componentName}"]`)).to.exist;
        });
        it('should render a ul with attribute for and mdl classes', () => {
            expect(selectComponent.find(`ul[for="${componentName}"].mdl-menu`)).to.exist;
        });
        it('should render and ul with an UNSELECTED_KEY', () => {
            expect(selectComponent.find('ul li')).to.have.length(1);
            expect(selectComponent.find('ul li').at(0).text()).to.equal('select.unSelected');
            expect(selectComponent.find(`ul li[data-selected=${false}]`)).to.have.length(1);
            expect(selectComponent.find('ul li[data-val="UNSELECTED_KEY"]')).to.have.length(1);
        });
        it('should not have a value', () => {
            expect(wrapper.instance().getValue()).to.be.null;
        });
    });
    describe('when a values are provided', () => {
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={VALUES} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('should display a list of values with MDL classes', () => {
            selectComponent.find('ul li').map(node => {
                expect(node.hasClass('mdl-menu__item')).to.be.true;
            });
        });
        it('should display the complete list of values + UNSELECTED_KEY', () => {
            expect(selectComponent.find('ul li')).to.have.length(VALUES.length + 1);
            expect(selectComponent.find('ul li').at(0).text()).to.equal('select.unSelected');
        });
    });
    describe('when hasUndefined prop is set to false', () => {
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={VALUES} hasUndefined={false} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('should display the complete list of values without UNSELECTED_KEY', () => {
            expect(selectComponent.find('ul li')).to.have.length(VALUES.length);
            expect(selectComponent.find('ul li').at(0).text()).to.not.equal('select.unSelected');
        });
    });
    describe('when a value is provided', () => {
        const selectedValue = 'VALUE1';
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={VALUES} value={selectedValue} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('should return the value when provided as a props', () => {
            expect(wrapper.instance().getValue()).to.equal(selectedValue);
        });
        it('should render the value in the DOM', () => {
            expect(selectComponent.find(`ul li[data-selected=${true}]`)).to.have.length(1);
            expect(selectComponent.find(`ul li[data-val="${selectedValue}"]`)).to.have.length(1);
        });
    });
    describe('when isActive prop is taken is account', () => {
        const activeValues = [
            { code: 'VALUE3', label: 'value 3', isActive: false },
            { code: 'VALUE4', label: 'value 4', isActive: true}
        ];
        const unifiedValues = xor(VALUES, activeValues);
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={unifiedValues} hasUndefined={false} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('shoud display only props with isActive=true', () => {
            console.log(selectComponent.html());
            expect(selectComponent.find(`ul li`)).to.have.length(3);
        });
    });
    describe('when a custom value is defined for isActiveProperty prop', () => {
        const activeValues = [
            { code: 'VALUE3', label: 'value 3', isActive: false },
            { code: 'VALUE4', label: 'value 4', isActive: true},
            { code: 'VALUE5', label: 'value 5', isActivated: false },
            { code: 'VALUE6', label: 'value 6', isActivated: true}
        ];
        const unifiedValues = xor(VALUES, activeValues);
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={unifiedValues} hasUndefined={false} isActiveProperty='isActivated' />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('shoud display only props with custom isActiveProperty', () => {
            expect(selectComponent.find(`ul li`)).to.have.length(5);
        });
    });
    describe('when the user select a new value', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Select name='component' onChange={spy} values={VALUES} hasUndefined={false} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('should call onChange with the new value', () => {
            selectComponent.find('ul li').at(0).simulate('click');
            expect(spy).to.have.property('callCount', 1);
            expect(spy).to.have.been.calledWith()
        });
    });
    describe('when there is an error', () => {
        const message = 'this is an error';
        const wrapper = mount(<Select name='component' onChange={sinon.spy()} values={VALUES} error={message} />)
        const selectComponent = wrapper.find('[data-focus="select-mdl"]');
        it('it should be displayed', () => {
            expect(selectComponent.find('div.label-error')).to.exist;
            expect(selectComponent.find('div.label-error').text()).to.equal(message);
        });
    })
});
