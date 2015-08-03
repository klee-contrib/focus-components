// Dependencies

let React = require('react');
let type = require('focus').component.types;
let find = require('lodash/collection/find');
let result = require('lodash/object/result');

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
    /**
    * Render the label part of the component.
    * @returns {[type]} [description]
    */
    label() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return undefined;
        }
        if (this.props.hasLabel) {
            let labelClassName = this._getLabelGridClassName();
            return (
                <Label
                    style={{className: labelClassName}}
                    name={this.props.name}
                    key={this.props.name}
                    isRequired={this.props.isRequired}
                    isEdit={this.props.isEdit}
                />
            );
        }
    },
    /**
    * Rendet the input part of the component.
    * @return {[type]} [description]
    */
    input() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        let inputClassName = `form-control`;
        return (
            <div className ={`${this._getContentGridClassName()} input-group`}>
                <this.props.InputComponent
                    style={{class: inputClassName}}
                    id={this.props.name}
                    name={this.props.name}
                    value={this.state.value}
                    type={this.props.type}
                    onChange={this.onInputChange}
                    formatter={this.props.formatter}
                    unformatter={this.props.unformatter}
                    options={this.props.options}
                    ref='input'
                />
            </div>
        );
    },
    /**
    * [select description]
    * @return {[type]} [description]
    */
    select() {
        if (this.props.FieldComponent || this.props.InputLabelComponent) {
            return this.renderFieldComponent();
        }
        let selectClassName = `form-control`;
        return (
            <div className ={`input-group ${this._getContentGridClassName()}`}>
            <this.props.SelectComponent
            style={{class: selectClassName}}
            id={this.props.name}
            name={this.props.name}
            value={this.state.value}
            values={this.state.values}
            type={this.props.type}
            onChange={this.onInputChange}
            options={this.props.options}
            ref='input'
            />
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
        let displayClassName = ``;
        let value = this.state.values ? result(find(this.state.values, {code: this.state.value}), 'label') : this.state.value;
        return (
            <div className ={`input-group ${this._getContentGridClassName()}`}>
                <this.props.DisplayComponent
                    style={{class: displayClassName}}
                    id={this.props.name}
                    name={this.props.name}
                    value={value}
                    type={this.props.type}
                    ref='display'
                    formatter={this.props.formatter}
                />
            </div>
        );
    },
    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error() {
        if (this.state.error) {
            if (this.props.FieldComponent) {
                return;
            }
            return (
                /*<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>*/
                <span className='help-block'>
                    {this.state.error}
                </span>
            )
        }
    },
    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help() {
        if (this.props.help) {
            if (this.props.FieldComponent) {
                return;
            }
            return (
                <span className='help-block'>
                    {this.props.help}
                </span>
            );
        }
    },
    /**
    * Render the field component if it is overriden in the component definition.
    */
    renderFieldComponent() {
        let Component = this.props.FieldComponent || this.props.InputLabelComponent;
        return React.createElement(Component, {
            id: this.props.name,
            name: this.props.name,
            label: this.props.label,
            value: this.state.value,
            type: this.props.type,
            style: this.props.style.input,
            labelSize: this.props.labelSize,
            error: this.state.error,
            help: this.props.help,
            onChange: this.onInputChange,
            ref: 'input'
        });
    }
};

module.exports = fieldBuiltInComponentsMixin;
