//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var types = require('focus').component.types;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var union = require('lodash/array/union');

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;
var isNull = _require.isNull;
var isNumber = _require.isNumber;

/**
* Input text mixin.
* @type {Object}
*/
var selectTextMixin = {
    /** @inheritdoc */
    displayName: 'Select',
    /** @inheritdoc */
    mixins: [i18nMixin, stylableMixin],
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            labelKey: 'label',
            multiple: false,
            values: [],
            valueKey: 'code',
            hasUndefined: true
        };
    },
    /** @inheritdoc */
    propTypes: {
        multiple: types('bool'),
        labelKey: types('string'),
        name: types('string'),
        isRequired: types('bool'),
        onChange: types('function'),
        value: types(['number', 'string', 'array']),
        values: types('array'),
        valueKey: types('string')
    },
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        var _props = this.props;
        var hasUndefined = _props.hasUndefined;
        var value = _props.value;
        var values = _props.values;
        var valueKey = _props.valueKey;
        var isRequired = _props.isRequired;

        var hasValue = !isUndefined(value) && !isNull(value);
        var isRequiredAndHasValue = true === isRequired && hasValue;
        return {
            value: value,
            hasUndefined: false === hasUndefined || isRequiredAndHasValue ? false : true, //!value
            isNumber: values && 0 < values.length && values[0] && values[0][valueKey] && isNumber(values[0][valueKey])
        };
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },
    /**
     * Get the value of the component.
     * @return {object} - Return the value of the component.
     */
    getValue: function getValue() {
        var domValue = React.findDOMNode(this).value;
        return this.state.isNumber ? +domValue : domValue;
    },
    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleOnChange: function _handleOnChange(event) {
        //On change handler.
        var _props2 = this.props;
        var onChange = _props2.onChange;
        var multiple = _props2.multiple;

        if (onChange) {
            onChange(event);
        } else {
            var domValue = event.target.value;
            var value = this.state.isNumber ? +domValue : domValue;
            //Set the state then call the change handler.
            if (multiple) {
                var vals = this.state.value;
                vals.push(value);
                return this.setState({ value: vals });
            }
            return this.setState({ value: value });
        }
    },
    /** @inheritdoc */
    renderOptions: function renderOptions() {
        var _this = this;

        var processValues = undefined;
        var _props3 = this.props;
        var labelKey = _props3.labelKey;
        var valueKey = _props3.valueKey;
        var values = _props3.values;
        var hasUndefined = this.state.hasUndefined;

        if (hasUndefined) {
            var _ref;

            processValues = union([(_ref = {}, _ref[labelKey] = 'select.unSelected', _ref[valueKey] = null, _ref)], values);
        } else {
            processValues = values;
        }
        return processValues.map(function (val, idx) {
            var value = '' + val[valueKey];
            var label = val[labelKey] || 'select.noLabel';
            return React.createElement(
                'option',
                { key: idx, value: value },
                _this.i18n(label)
            );
        });
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render: function render() {
        var props = this.props;
        var state = this.state;
        var _getStyleClassName = this._getStyleClassName;
        var _handleOnChange = this._handleOnChange;
        var multiple = props.multiple;
        var name = props.name;
        var value = state.value;

        var selectProps = { multiple: multiple, value: '' + value, name: name, onChange: _handleOnChange, className: _getStyleClassName };
        return React.createElement(
            'select',
            selectProps,
            this.renderOptions()
        );
    }
};

module.exports = builder(selectTextMixin);