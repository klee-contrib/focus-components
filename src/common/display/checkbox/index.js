//Dependencies.
import builder from 'focus-core/component/builder';
import React from 'react';
import type from 'focus-core/component/types';
import i18nBehaviour from '../../i18n/mixin';

/**
 * Input text mixin.
 * @type {Object}
 */
let displayCheckboxMixin = {
    mixins: [i18nBehaviour],
    /** @inheritdoc */
    getDefaultProps() {
        return {
            value: undefined,
            name: undefined,
            style: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: type('string'),
        value: type('bool'),
        name: type('string'),
        style: type('object')
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/display/checkbox/ instead');
    },
    /**
     * Render the boolean value.
     */
    renderValue() {
        let stringValue = this.props.value === true ? 'true' : 'false';
        return this.i18n(`display.checkbox.${stringValue}`);
    },
    /**
     * Render a display field.
     * @return {DOM} - The dom of an input.
     */
    render() {
        return (
            <div
                id={this.props.name}
                name={this.props.name}
                className={this.props.style.class}
            >
                {this.renderValue()}
            </div>
        );
    }
};


const { mixin, component } = builder(displayCheckboxMixin);
export { mixin, component };
export default { mixin, component };
