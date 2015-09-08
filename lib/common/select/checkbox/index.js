'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var Checkbox = require('../../input/checkbox');

var checkboxMixin = {
    /**
     * Tag name.
     */
    displayName: 'select-checkbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            value: [],
            values: [],
            valueKey: 'value',
            labelKey: 'label'
        };
    },

    /** @inheritdoc */
    propTypes: function propTypes() {
        return {
            value: type('array'),
            values: type('array'),
            valueKey: type('string'),
            labelKey: type('string'),
            name: type('string'),
            style: type('object')
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialStateSelect() {
        return {
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function selectWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },

    /**
     * Get the value from the select in the DOM.
     */
    getValue: function getSelectTextValue() {
        return this.state.value;
    },

    _handleChange: function handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        } else {
            var currentValue = this.state.value;
            var selectedValue = event.target.value;
            var idx = currentValue.indexOf(event.target.value);
            if (idx >= 0) {
                currentValue.splice(idx, 1);
            } else {
                currentValue.push(selectedValue);
            }
            this.setState({ value: currentValue });
        }
    },

    /**
     * Render all selection checkbox.
     */
    renderCheckbox: function renderCheckbox() {
        var _this = this;

        var key = 0;
        return this.props.values.map(function (val) {
            var value = val[_this.props.valueKey];
            var label = val[_this.props.labelKey];
            var isChecked = _this.state.value.indexOf(value) >= 0;
            return React.createElement(
                'div',
                { className: 'paper-cb', key: key++ },
                React.createElement(
                    'label',
                    { className: 'paper-cb-label' },
                    React.createElement('input', { type: 'checkbox',
                        name: _this.props.name,
                        value: value,
                        checked: isChecked,
                        onChange: _this._handleChange,
                        className: 'paper-cbx'
                    }),
                    React.createElement(
                        'div',
                        null,
                        label
                    )
                )
            );
        });
    },

    /** @inheritdoc */
    render: function render() {
        return React.createElement(
            'div',
            {
                className: this.props.style.className,
                name: this.props.name
            },
            this.renderCheckbox()
        );
    }
};

module.exports = builder(checkboxMixin);