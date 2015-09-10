'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var React = require('react');
var Checkbox = require('../../input/checkbox').component;
var i18nBehaviour = require('../../i18n/mixin');

var _require = require('lodash/array');

var pull = _require.pull;

var selectCheckboxMixin = {
    mixins: [i18nBehaviour],
    /**
    * Tag name.
    */
    displayName: 'SelectCheckbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            values: [], // all values
            value: [], // selected values list
            valueKey: 'value', // key for the displayed value
            labelKey: 'label' // key for the displayed label
        };
    },
    /** @inheritdoc */
    propTypes: function propTypes() {
        return {
            values: types('array'),
            value: types('array'),
            valueKey: types('string'),
            labelKey: types('string')
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            selectedValues: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ selectedValues: newProps.value });
    },

    /**
    * Get the value from the select in the DOM.
    * @return {string} value
    */
    getValues: function getValues() {
        return this.state.selectedValues;
    },

    /**
     * Handle a change of value.
     * @param  {[type]} key       the key
     * @param  {[type]} newStatus the new status
     */
    _handleCheckboxChange: function _handleCheckboxChange(key, newStatus) {
        var selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({ value: selectedValues });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    /**
     * Closure to capture key and checbox status.
     * @param  {[type]} key the key of checkbox
     * @return {[type]} status closure
     */
    _getCheckboxChangeHandler: function _getCheckboxChangeHandler(key) {
        var _this = this;

        return function (status) {
            _this._handleCheckboxChange(key, status);
        };
    },
    /**
     * Render all selection checkbox.
     * @return {ReactDOMNode} list of ReactDomNode
     */
    renderCheckboxes: function renderCheckboxes() {
        var _this2 = this;

        return this.props.values.map(function (val, idx) {
            var value = val[_this2.props.valueKey];
            var label = val[_this2.props.labelKey];
            var isChecked = 0 <= _this2.state.selectedValues.indexOf(value);
            return React.createElement(Checkbox, { key: idx, label: _this2.i18n(label), onChange: _this2._getCheckboxChangeHandler(value), value: isChecked });
        });
    },

    /** @inheritdoc */
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'select-checkbox' },
            this.renderCheckboxes()
        );
    }
};

module.exports = builder(selectCheckboxMixin);