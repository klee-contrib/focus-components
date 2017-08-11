
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import { mount, render, shallow } from 'enzyme';
import Tooltip from '../';

describe('Tooltip Component', () => {
    describe('when mounted with no props', () => {
        const wrapper = mount(<Tooltip />);
        it('should be rendered in the DOM with [data-focus="tooltip"] attribute', () => {
            expect(wrapper.find('[data-focus="tooltip"]')).toHaveLength(1);
        });
        it('should be rendered in the DOM with "mdl-tooltip" className"', () => {
            expect(wrapper.find('.mdl-tooltip')).toHaveLength(1);
        });
        it('should be rendered in the DOM with "mdl-tooltip--bottom" className"', () => {
            expect(wrapper.find('.mdl-tooltip--bottom')).toHaveLength(1);
            // console.log(wrapper.component.props)
        });
    });
    describe('when mounted with props', () => {
        describe('isLarge', () => {
            const wrapper = mount(<Tooltip isLarge={true} />);
            it('should be rendered in the DOM with "mdl-tooltip--large" className"', () => {
                expect(wrapper.find('.mdl-tooltip--large')).toHaveLength(1);
            });
        })
        describe('position "top"', () => {
            const wrapper = mount(<Tooltip position='top' isLarge={true} />);
            it('should be rendered in the DOM with "mdl-tooltip--top" className"', () => {
                expect(wrapper.find('.mdl-tooltip--top')).toHaveLength(1);
            });
        })
        describe('position "left"', () => {
            const wrapper = mount(<Tooltip position='left' isLarge={true} />);
            it('should be rendered in the DOM with "mdl-tooltip--left" className"', () => {
                expect(wrapper.find('.mdl-tooltip--left')).toHaveLength(1);
            });
        })
        describe('position "right"', () => {
            const wrapper = mount(<Tooltip position='right' isLarge={true} />);
            it('should be rendered in the DOM with "mdl-tooltip--right" className"', () => {
                expect(wrapper.find('.mdl-tooltip--right')).toHaveLength(1);
            });
        })
    });
});
