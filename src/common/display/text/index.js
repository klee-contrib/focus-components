//Dependencies.
const {builder, types} = require('focus-core').component;
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
    getDefaultProps(){
        return {
            formatter: (data)=> data
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
    renderValue(){
        const {formatter, value} = this.props;
        const translatedValue = value ? this.i18n(value) : value;
        return formatter(translatedValue);
    },
    /** @inheritdoc */
    render: function renderInput() {
        return <div {...this.props}>{this.renderValue()}</div>;
    }
};


module.exports = builder(displayTextMixin);
