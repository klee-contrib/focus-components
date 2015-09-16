//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var i18nBehaviour = require('../../i18n/mixin');

/**
* Input text mixin.
* @type {Object}
*/
var displayTextMixin = {
    mixins: [i18nBehaviour],
    displayName: 'DisplayText',
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            formatter: function formatter(data) {
                return data;
            }
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
    renderValue: function renderValue() {
        var _props = this.props;
        var formatter = _props.formatter;
        var value = _props.value;

        var translatedValue = value ? this.i18n(value) : value;
        return formatter(translatedValue);
    },
    /** @inheritdoc */
    render: function renderInput() {
        return React.createElement(
            'div',
            this.props,
            this.renderValue()
        );
    }
};

module.exports = builder(displayTextMixin);