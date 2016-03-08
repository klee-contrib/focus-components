//Dependencies.
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
const React = require('react');
const i18nBehaviour = require('../../i18n/mixin');

/**
* Input text mixin.
* @type {Object}
*/
const displayTextMixin = {
    mixins: [i18nBehaviour],
    displayName: 'DisplayText',
    /** @inheritdoc */
    getDefaultProps() {
        return {
            formatter: (data) => data
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        style: types('object')
    },
    /**
    * Render the value.
    * @return {string} The formated value.
    */
    renderValue() {
        const {formatter, value} = this.props;
        return formatter(value);
    },
    /** @inheritdoc */
    render: function renderInput() {
        return <div {...this.props}>{this.renderValue()}</div>;
    }
};


module.exports = builder(displayTextMixin);
