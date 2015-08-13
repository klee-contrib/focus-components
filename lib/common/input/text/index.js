//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            value: undefined,
            name: undefined,
            style: {},
            /**
             * Default formatter.
             * @param  {object} d - Data to format.
             * @return {object}   - The formatted data.
             */
            formatter: function formatter(d) {
                return d;
            },
            /**
             * Default unformatter.
             * @param  {object} d - Data to unformat.
             * @return {object}   - The unformatted data.
             */
            unformatter: function unformatter(d) {
                return d;
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
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        var _props = this.props;
        var formatter = _props.formatter;
        var value = _props.value;

        return {
            value: formatter(value)
        };
    },
    /**
     * Update the component.
     * @param {object} newProps - The new props to update.
     */
    componentWillReceiveProps: function inputWillReceiveProps(newProps) {
        this.setState({ value: this.props.formatter(newProps.value) });
    },
    /**
     * Get the value from the input in the DOM.
     */
    getValue: function getInputTextValue() {
        return this.props.unformatter(React.findDOMNode(this).value);
    },
    /**
     * Handle the change value of the input.
     * @param {object} event - The sanitize event of input.
     */
    _handleOnChange: function inputOnChange(event) {
        //On change handler.
        var onChange = this.props.onChange;

        if (onChange) {
            return onChange(event);
        } else {
            //Set the state then call the change handler.
            this.setState({ value: event.target.value });
        }
    },
    /**
     * Render an input.
     * @return {DOM} - The dom of an input.
     */
    render: function renderInput() {
        var _props2 = this.props;
        var name = _props2.name;
        var style = _props2.style;

        var htmlType = this.props.type;
        var value = this.state.value;

        return React.createElement('input', {
            id: name,
            name: name,
            onChange: this._handleOnChange,
            style: style,
            type: htmlType,
            value: value
        });
    }
};

module.exports = builder(inputTextMixin);