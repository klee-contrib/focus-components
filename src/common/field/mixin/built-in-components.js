// Dependencies

let React = require('react');
let type = require('focus').component.types;
let find = require('lodash/collection/find');
let result = require('lodash/object/result');
let assign = require('object-assign');
// Components

let InputText = require('../../input/text').component;
let DisplayText = require('../../display/text').component;
let SelectClassic = require('../../select/classic').component;
let Label = require('../../label').component;

// Mixins

let fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

let fieldBuiltInComponentsMixin = {
    mixins: [fieldGridBehaviourMixin],
    getDefaultProps() {
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
            let labelClassName = this._getLabelGridClassName();
            let {isEdit, isRequired, name} = this.props;
            return (
                <Label
                    isEdit={isEdit}
                    isRequired={isRequired}
                    key={name}
                    name={name}
                    style={{className: labelClassName}}
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
        let {name, style} = this.props;
        let {value} = this.state;
        let inputClassName = `form-control ${style.className ? style.className : ''}`;
        let inputBuildedProps = assign({}, this.props, {
            id: name,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            value: value,
            ref: 'input'
        });
        return (
            <div className ={`${this._getContentGridClassName()} input-group`}>
                <this.props.InputComponent {...inputBuildedProps}/>
            </div>
        );
    },
    /**
     * Build a select component depending on the domain, definition and props.
     * @return {Component} - The builded select component.
     */
    select() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        let {value, values} = this.state;
        let buildedSelectProps = assign({}, this.props, {
            value: value,
            values: values,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            ref: 'input'
        });
        return (
            <div className ={`input-group ${this._getContentGridClassName()}`}>
                <this.props.SelectComponent {...buildedSelectProps} />
            </div>
        );
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
        return (
            <div className ={`input-group ${this._getContentGridClassName()}`}>
                <this.props.DisplayComponent {...buildedDislplayProps}/>
            </div>
        );
    },
    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error() {
        let {error} = this.state;
        if (error) {
            if (this.props.FieldComponent) {
                return;
            }
            return (
                <span className='help-block'>
                    {error}
                </span>
            );
        }
        return;
    },
    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help() {
        let {help, FieldComponent} = this.props;
        if (help) {
            if (FieldComponent) {
                return;
            }
            return (
                <span className='help-block'>
                    {help}
                </span>
            );
        }
    },
    /**
     * Render the field component if it is overriden in the component definition.
     * @return {Component} - The builded field component.
     */
    renderFieldComponent() {
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
    }
};

module.exports = fieldBuiltInComponentsMixin;
