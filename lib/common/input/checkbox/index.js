'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');
var fieldGridBehaviour = require('../../mixin/field-grid-behaviour');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;

var checkBoxMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviour, mdlBehaviour],

    /**
    * Tag name.
    */
    displayName: 'input-checkbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            value: false
        };
    },
    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        value: types('bool'),
        label: types('string'),
        onChange: types('func')
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    },
    /** @inheritDoc */
    getInitialState: function getInitialState() {
        var value = this.props.value;

        return {
            isChecked: isUndefined(value) ? false : value
        };
    },
    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange: function _onChange() {
        var _this = this;

        this.setState({
            isChecked: !this.state.isChecked
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.isChecked);
            }
        });
    },
    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue: function getValue() {
        return this.state.isChecked;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function render() {
        var isChecked = this.state.isChecked;
        var label = this.props.label;

        var checkedProps = isChecked ? { checked: 'checked' } : {};
        var inputProps = _extends({ className: 'mdl-checkbox__input', onChange: this._onChange, type: 'checkbox' }, checkedProps);
        return React.createElement(
            'label',
            { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox' },
            React.createElement('input', inputProps),
            label && React.createElement(
                'span',
                { className: 'mdl-checkbox__label' },
                this.i18n(label)
            )
        );
    }
};

module.exports = builder(checkBoxMixin);