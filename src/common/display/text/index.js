//Dependencies.
const builder = require('focus').component.builder;
const React = require('react');
const type = require('focus').component.types;
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
        type: type('string'),
        value: type(['string', 'number']),
        name: type('string'),
        style: type('object')
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
