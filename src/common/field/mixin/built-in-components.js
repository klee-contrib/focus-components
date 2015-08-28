// Dependencies

const React = require('react');
const type = require('focus').component.types;
const find = require('lodash/collection/find');
const result = require('lodash/object/result');
const assign = require('object-assign');
// Components

const InputText = require('../../input/text').component;
const DisplayText = require('../../display/text').component;
const SelectClassic = require('../../select/classic').component;
const Label = require('../../label').component;

// Mixins

const fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

const fieldBuiltInComponentsMixin = {
    mixins: [fieldGridBehaviourMixin],
    getDefaultProps(){
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
    _buildStyle(){
        let {style} = this.props;
        style = style || {};
        style.className = style && style.className ? style.className : '';
        return style;
    },
    /**
    * Render the label part of the component.
    * @returns {Component} - The builded label component.
    */
    label() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return undefined;
        }
        if (this.props.hasLabel) {
            //In the labelCasen there is no reason to pass all props.
            let {isEdit, isRequired, name} = this.props;
            return (
                <Label
                    isEdit={isEdit}
                    isRequired={isRequired}
                    key={name}
                    name={name}
                />
            );
        }
    },
    /**
    * Rendet the input part of the component.
    * @return {Component} - The constructed input component.
    */
    input() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        const {name: id, label: placeHolder} = this.props;
        const {value, error} = this.state;
        const {onInputChange: onChange} = this;
        let inputBuildedProps = assign({}, this.props, {
            id,
            onChange,
            value,
            error,
            placeHolder,
            ref: 'input'
        });
        return <this.props.InputComponent {...inputBuildedProps}/>;
    },
    /**
     * Build a select component depending on the domain, definition and props.
     * @return {Component} - The builded select component.
     */
    select() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        let {value} = this.state;
        let buildedSelectProps = assign({}, this.props, {
            value: value,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            ref: 'input'
        });
        return <this.props.SelectComponent {...buildedSelectProps} />;
    },
    /**
    * Render the display part of the component.
    * @return {object} - The display part of the compoennt if the mode is not edit.
    */
    display() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        let {values, value} = this.state;
        let {name, valueKey, labelKey} = this.props;
        let _processValue = values ? result(find(values, {[valueKey || 'code']: value}), labelKey || 'label') : value;
        let buildedDislplayProps = assign({}, this.props, {
            id: name,
            style: this._buildStyle(),
            value: _processValue,
            ref: 'display'
        });
        return <this.props.DisplayComponent {...buildedDislplayProps}/>;
    },
    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error() {
        let {error} = this.state;
        if (error) {
            return (
                <span className='mdl-textfield__error'>
                    {error}
                </span>
            );
        }
    },
    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help() {
        let {help, name} = this.props;
        if (help) {
            return (
                <label className='mdl-textfield__label' htmFor={`${name}`}>
                    {help}
                </label>
            );
        }
    },
    /**
     * Render the field component if it is overriden in the component definition.
     * @return {Component} - The builded field component.
     */
    _renderFieldComponent() {
        let FieldComponent = this.props.FieldComponent || this.props.InputLabelComponent;
        let {value, error} = this.state;
        let buildedProps = assign({}, this.props, {
            id: this.props.name,
            style: this._buildStyle(),
            value: value,
            error: error,
            onChange: this.onInputChange,
            ref: 'input'
        });
        return <FieldComponent {...buildedProps} />;
    },
    /**
     * Render the default field component.
     * @return {React} -
     */
    _renderDefaultFieldComponent(){
        let { isRequired, isEdit, values, FieldComponent, InputLabelComponent} = this.props;
        let {input, label, select, display, _className} = this;
        return(
            <div>
                <div className ={`${this._getLabelGridClassName()}`} data-focus='field-label-container'>{label()}</div>
                <div className ={`${this._getContentGridClassName()}`} data-focus='field-value-container'>
                    {isEdit ? (values ? select() : input()) : display()}
                </div>
            </div>
        );
    }
};

module.exports = fieldBuiltInComponentsMixin;
