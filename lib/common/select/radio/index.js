'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

var radioMixin = {
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
    propTypes: function propTypes() {
        return {
            value: type(['number', 'string']),
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

    /**
     * handle click on radio
     * @param {object} event - the click event
     */
    _handleChange: function selectOnChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        } else {
            //Set the state then call the change handler.
            this.setState({ value: event.target.value });
        }
    },

    /**
     * Render radio for each values
     * @return {XML} the different radio values
     */
    renderRadios: function renderRadio() {
        var _this = this;

        var key = 0;
        return this.props.values.map(function (val) {
            var value = val[_this.props.valueKey];
            var label = val[_this.props.labelKey];
            var isChecked = value == _this.state.value;
            return React.createElement(
                'div',
                { className: 'radio radio-primary', key: key++ },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'radio',
                        name: _this.props.name,
                        value: value,
                        checked: isChecked,
                        onChange: _this._handleChange
                    }),
                    React.createElement('span', { className: 'circle' }),
                    React.createElement('span', { className: 'check' }),
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
    render: function renderRadio() {
        return React.createElement(
            'div',
            {
                className: this.props.style.className,
                name: this.props.name
            },
            this.renderRadios()
        );
    }
};

module.exports = builder(radioMixin);