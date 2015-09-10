'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

/**
*
* @type {Object}
*/
var textAreaMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
    /**
    * Gets the default props.
    * @return {object} default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            minlength: 0,
            wrap: 'soft',
            required: false,
            rows: 5,
            cols: 50
        };
    },
    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        minlength: types('number'),
        maxlength: types('number'),
        wrap: types('string'),
        required: types('bool'),
        value: types('string'),
        label: types('string'),
        rows: types('number'),
        cols: types('number')
    },
    /** inheritedDoc */
    getInitialState: function getInitialState() {
        return {
            value: this.props.value
        };
    },
    /**
    * On change handler.
    * @param {object} event - Sanitize event.
    */
    _onChange: function onChange(event) {
        this.setState({ value: event.target.value });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    /**
    * Get the value from the input in the DOM.
    */
    getValue: function getTextAreaValue() {
        return this.getDOMNode().value;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function renderTextArea() {
        var _props = this.props;
        var cols = _props.cols;
        var label = _props.label;
        var maxlength = _props.maxlength;
        var minlength = _props.minlength;
        var rows = _props.rows;

        return React.createElement(
            'div',
            { className: 'mdl-textfield mdl-js-textfield', 'data-focus': 'input-textarea' },
            React.createElement(
                'textarea',
                { className: 'mdl-textfield__input', cols: cols, maxLength: maxlength, minLength: minlength, onChange: this._onChange, ref: 'textarea', rows: rows, type: 'text' },
                this.state.value
            ),
            React.createElement(
                'label',
                { className: 'mdl-textfield__label' },
                this.i18n(label)
            )
        );
    }
};

module.exports = builder(textAreaMixin);