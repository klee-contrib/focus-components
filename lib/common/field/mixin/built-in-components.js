// Dependencies

'use strict';

var React = require('react');
var type = require('focus').component.types;
var find = require('lodash/collection/find');
var result = require('lodash/object/result');
var assign = require('object-assign');
// Components

var InputText = require('../../input/text').component;
var DisplayText = require('../../display/text').component;
var SelectClassic = require('../../select/classic').component;
var Label = require('../../label').component;

// Mixins

var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

var fieldBuiltInComponentsMixin = {
    mixins: [fieldGridBehaviourMixin],
    getDefaultProps: function getDefaultProps() {
        return {
            /**
            * Does the component has a Label.
            * @type {Boolean}
            */
            hasLabel: true,
            /**
            * Redefine complety the component.
            * @type {Object}
            */
            FieldComponent: undefined,
            /**
            * Redefine only the input and label component.
            * @type {Object}
            */
            InputLabelComponent: undefined,
            /**
            * Component for the input.
            * @type {Object}
            */
            InputComponent: InputText,
            /**
            * Component for the select.
            * @type {Object}
            */
            SelectComponent: SelectClassic,
            /**
            * Component for the display.
            * @type {Object}
            */
            DisplayComponent: DisplayText
        };
    },
    /** @inheriteDoc */
    propTypes: {
        hasLabel: type('bool'),
        labelSize: type('number'),
        FieldComponent: type(['object', 'function']),
        InputLabelComponent: type(['object', 'function']),
        InputComponent: type(['object', 'function']),
        SelectComponent: type(['object', 'function']),
        DisplayComponent: type(['object', 'function'])
    },
    _buildStyle: function _buildStyle() {
        var style = this.props.style;

        style = style || {};
        style.className = style && style.className ? style.className : '';
        return style;
    },
    /**
    * Render the label part of the component.
    * @returns {Component} - The builded label component.
    */
    label: function label() {
        var name = this.props.name;

        return React.createElement(
            'div',
            { className: '' + this._getLabelGridClassName(), 'data-focus': 'field-label-container' },
            React.createElement(Label, { name: name })
        );
    },
    /**
    * Rendet the input part of the component.
    * @return {Component} - The constructed input component.
    */
    input: function input() {
        var _props = this.props;
        var id = _props.name;
        var placeHolder = _props.label;
        var _state = this.state;
        var value = _state.value;
        var error = _state.error;
        var onChange = this.onInputChange;

        var inputBuildedProps = assign({}, this.props, {
            id: id,
            onChange: onChange,
            value: value,
            error: error,
            placeHolder: placeHolder,
            ref: 'input'
        });
        return React.createElement(this.props.InputComponent, inputBuildedProps);
    },
    /**
     * Build a select component depending on the domain, definition and props.
     * @return {Component} - The builded select component.
     */
    select: function select() {
        var value = this.state.value;

        var buildedSelectProps = assign({}, this.props, {
            value: value,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            ref: 'input'
        });
        return React.createElement(this.props.SelectComponent, buildedSelectProps);
    },
    /**
    * Render the display part of the component.
    * @return {object} - The display part of the compoennt if the mode is not edit.
    */
    display: function display() {
        var _find;

        var _state2 = this.state;
        var values = _state2.values;
        var value = _state2.value;
        var _props2 = this.props;
        var name = _props2.name;
        var valueKey = _props2.valueKey;
        var labelKey = _props2.labelKey;

        var _processValue = values ? result(find(values, (_find = {}, _find[valueKey || 'code'] = value, _find)), labelKey || 'label') : value;
        var buildedDislplayProps = assign({}, this.props, {
            id: name,
            style: this._buildStyle(),
            value: _processValue,
            ref: 'display'
        });
        return React.createElement(this.props.DisplayComponent, buildedDislplayProps);
    },
    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error: function error() {
        var error = this.state.error;

        if (error) {
            return React.createElement(
                'span',
                { className: 'mdl-textfield__error' },
                error
            );
        }
    },
    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help: function help() {
        var _props3 = this.props;
        var help = _props3.help;
        var name = _props3.name;

        if (help) {
            return React.createElement(
                'label',
                { className: 'mdl-textfield__label', htmFor: '' + name },
                help
            );
        }
    },
    /**
     * Render the field component if it is overriden in the component definition.
     * @return {Component} - The builded field component.
     */
    _renderFieldComponent: function _renderFieldComponent() {
        var FieldComponent = this.props.FieldComponent || this.props.InputLabelComponent;
        var _state3 = this.state;
        var value = _state3.value;
        var error = _state3.error;

        var buildedProps = assign({}, this.props, {
            id: this.props.name,
            value: value,
            error: error,
            onChange: this.onInputChange,
            ref: 'input'
        });
        return React.createElement(FieldComponent, buildedProps);
    }
};

module.exports = fieldBuiltInComponentsMixin;