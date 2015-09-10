// Dependencies.

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var assign = require('object-assign');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

/**
* Identity function.
* @param  {object} d - The data.
*/
var identity = function identity(d) {
    return d;
};

/**
* Input text mixin.
* @type {Object}
*/
var inputTextComponent = {
    mixins: [mdlBehaviour],

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            /**
            * Default formatter.
            * @param  {object} d - Data to format.
            * @return {object}   - The formatted data.
            */
            formatter: identity,
            /**
            * Default unformatter.
            * @param  {object} d - Data to unformat.
            * @return {object}   - The unformatted data.
            */
            unformatter: identity
        };
    },
    /** @inheritdoc */
    propTypes: {
        onChange: types('func'),
        onKeyPress: types('func'),
        error: types('string'),
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        placeHolder: types('string')
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
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: this.props.formatter(newProps.value) });
    },
    /**
    * Get the value from the input in the DOM.
    * @return {object} - The value of the formatter.
    */
    getValue: function getValue() {
        return this.props.unformatter(React.findDOMNode(this.refs.inputText).value);
    },
    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleInputChange: function _handleInputChange(event) {
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
     * Input key press handler.
     * @param  {Object} event   event raised by the key press
     */
    _handleInputKeyPress: function _handleInputKeyPress(event) {
        var onKeyPress = this.props.onKeyPress;

        if (onKeyPress) {
            onKeyPress(event);
        }
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render: function render() {
        var value = this.state.value;
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeHolder = _props2.placeHolder;
        var style = _props2.style;

        var inputProps = assign({}, this.props, { value: value }, { id: name, onChange: this._handleInputChange, onKeyPress: this._handleInputKeyPress });
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        return React.createElement(
            'div',
            { className: 'mdl-textfield mdl-js-textfield', 'data-focus': 'input-text', ref: 'inputText', style: style },
            React.createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'inputText' }, inputProps, { pattern: pattern })),
            React.createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                placeHolder
            ),
            error && React.createElement(
                'span',
                { className: 'mdl-textfield__error' },
                error
            )
        );
    }
};

module.exports = builder(inputTextComponent);