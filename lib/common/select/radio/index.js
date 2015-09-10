'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var types = require('focus').component.types;
var i18nBehaviour = require('../../i18n/mixin');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/utility');

var uniqueId = _require.uniqueId;

var InputRadio = require('../../input/radio').component;

var selectRadioMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
    /**
    * Tag name.
    */
    displayName: 'select-radio',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            values: [],
            valueKey: 'value',
            labelKey: 'label'
        };
    },

    /** @inheritdoc */
    propTypes: {
        values: types('array'),
        value: types(['number', 'string']),
        valueKey: types('string'),
        labelKey: types('string')
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            uniqueName: uniqueId('options_'),
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        });
    },

    /**
     * Get the value from the select in the DOM.
     * @return {string, number} selected value
     */
    getValue: function getValue() {
        return this.state.value;
    },

    /**
    * handle click on radio
    * @param {object} event - the click event
    */
    _handleRadioChange: function _handleRadioChange(newValue) {
        //Set the state then call the change handler.
        this.setState({ value: newValue });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    },
    /**
     * Closure to capture key and radio status.
     * @param  {string} key the key of radio
     * @return {func} status closure
     */
    _getRadioChangeHandler: function _getRadioChangeHandler(key) {
        var _this = this;

        return function () {
            _this._handleRadioChange(key);
        };
    },
    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */
    renderSelectRadios: function renderSelectRadios() {
        var _this2 = this;

        var uniqueName = this.state.uniqueName;

        return this.props.values.map(function (val, idx) {
            var value = val[_this2.props.valueKey];
            var label = val[_this2.props.labelKey];
            var isChecked = value === _this2.state.value;
            return React.createElement(InputRadio, { key: idx, label: _this2.i18n(label), name: uniqueName, onChange: _this2._getRadioChangeHandler(value), value: isChecked });
        });
    },
    /** @inheritdoc */
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'select-radio' },
            this.renderSelectRadios()
        );
    }
};

module.exports = builder(selectRadioMixin);