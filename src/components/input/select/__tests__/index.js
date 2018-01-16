
import { renderIntoDocument, Simulate } from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import { init } from 'focus-core/translation';

import Select from '../';

import identity from 'lodash/utility/identity';
import fixture from './fixture';
//onChangeSpy = jest.fn();

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

describe('The select ', () => {
    beforeEach(() => {
        init(i18nConfig);
    });
    // describe('when called with no props', () => {
    //     let component;
    //     beforeEach(
    //         () => {
    //             const shallowRenderer = TestUtils.createRenderer();
    //             shallowRenderer.render(<Select />);
    //             component = shallowRenderer.getRenderOutput();
    //         }
    //     );
    //     it('should render an empty select', () => {

    //     });
    // });
    describe('when called with minimal props', () => {
        let component, domNode;
        const mockValues = fixture.VALUES;
        beforeEach(
            () => {
                component = renderIntoDocument(<Select name='selectName' values={mockValues} onChange={identity} />);
                domNode = ReactDOM.findDOMNode(component);
            }
        );
        it('should render an empty select', () => {
            // i18n.init({
            //     dev: {
            //         translation: {
            //             select:{
            //                 unSelected: '-',
            //                 noLabel: 'No label'
            //             }
            //         }
            //     }
            // }, () => {
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.getAttribute('data-focus')).toBe('select');
            const domSelect = ReactDOM.findDOMNode(component.refs.htmlSelect);
            expect(domSelect.tagName).toBe('SELECT');
            expect(domSelect.options.length).toBe(mockValues.length + 1);
            expect(domSelect.options[0].value).toBe('UNSELECTED_KEY');
            //expect(domSelect.options[0].innerHTML).toBe('select.unSelected');
            expect(+domSelect.options[1].value).toBe(mockValues[0].code);
            expect(domSelect.options[1].innerHTML).toBe(mockValues[0].label);
            // });
        });
        it('should not have a value', () => {
            expect(component.getValue()).toBe(null);
        });
    });
    describe('when a value is provided', () => {
        const { VALUE, VALUES } = fixture;
        let component, domNode;
        beforeEach(() => {
            component = renderIntoDocument(<Select name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
        });
        it('should return the value when provided as a props', () => {
            expect(component.getValue()).toBe(VALUE);
        });
        it('should render the value in the DOM', () => {
            expect(ReactDOM.findDOMNode(component.refs.htmlSelect).value).toBe(`${VALUE}`);
        });
    });
    describe('when there is a isActive in the select list', () => {
        const { VALUES, VALUE } = fixture;
        let component;
        beforeEach(() => {
            component = renderIntoDocument(<Select isRequired hasUndefined={false} name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
        });
        describe('when there is list without isActive present', () => {
            it('shoud not filter the select list', () => {
                expect(ReactDOM.findDOMNode(component.refs.htmlSelect).options.length).toBe(VALUES.length);
            });
        });
        describe('when there is list with isActive present', () => {
            const { VALUES_ACTIVE, VALUE } = fixture;
            let component;
            beforeEach(() => {
                component = renderIntoDocument(<Select isRequired hasUndefined={false} name='selectName' onChange={identity} value={VALUE} values={VALUES_ACTIVE} />);
            });
            it('shoud filter the select list', () => {
                expect(ReactDOM.findDOMNode(component.refs.htmlSelect).options.length).toBe(2);
            });
        });
        describe('when there is list with a custom isActive present', () => {
            const { VALUES_CUSTOM_ACTIVE, VALUE } = fixture;
            let component;
            beforeEach(() => {
                component = renderIntoDocument(<Select isRequired hasUndefined={false} isActiveProperty='isActiveCustom' name='selectName' onChange={identity} value={VALUE} values={VALUES_CUSTOM_ACTIVE} />);
            });
            it('shoud filter the select list according to the custom value', () => {
                expect(ReactDOM.findDOMNode(component.refs.htmlSelect).options.length).toBe(2);
            });
        });
        describe('when there is list with a wrong custom isActive present', () => {
            const { VALUES_CUSTOM_ACTIVE, VALUE } = fixture;
            let component;
            beforeEach(() => {
                component = renderIntoDocument(<Select isActiveProperty='isActiveCustomPAPA' isRequired hasUndefined={false} name='selectName' onChange={identity} value={VALUE} values={VALUES_CUSTOM_ACTIVE} />);
            });
            it('shoud not filter the select list', () => {
                expect(ReactDOM.findDOMNode(component.refs.htmlSelect).options.length).toBe(VALUES_CUSTOM_ACTIVE.length);
            });
        });
    });
    describe('when the user select a new value', () => {
        const { VALUE, VALUES } = fixture;
        let onChangeSpy, component;
        beforeEach(
            () => {
                onChangeSpy = jest.fn();
                component = renderIntoDocument(<Select name='selectName' onChange={onChangeSpy} value={VALUE} values={VALUES} />);
            }
        );
        it('should call onChange with the new value', () => {
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlSelect), { target: { value: VALUE } });
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(VALUE);
        });
    });
    describe('when there is an error', () => {
        const { VALUE, VALUES } = fixture;
        const error = 'MY ERROR';
        let component;
        beforeEach(
            () => {
                component = renderIntoDocument(<Select error={error} name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
            }
        );
        it('it should be displayed', () => {
            const errorDOMNode = ReactDOM.findDOMNode(component.refs.error);
            expect(errorDOMNode).toBeDefined();
            expect(errorDOMNode.innerHTML).toBe(error);
        });
    })
});
