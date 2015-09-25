// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
// Mixins
var valueBehaviour = require('./mixin/value-behaviour');
var validationBehaviour = require('./mixin/validation-behaviour');
// Components
var builtInComponents = require('./mixin/built-in-components');

/**
 * Mixin for the field helper.
 * @type {Object}
 */
var FieldMixin = {
    /** @inheriteDoc */
    mixins: [valueBehaviour, validationBehaviour, builtInComponents],
    /** @inheriteDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            isEdit: true,
            type: 'text'
        };
    },
    /** @inheritdoc */
    propTypes: {
        /**
        * Edition mode of the field.
        * @type {Boolean}
        */
        isEdit: type('bool'),
        /**
        * HTML input type.
        * @type {String}
        */
        type: type('string'),
        /**
        * Field name.
        * @type {string}
        */
        name: type('string'),
        value: type(['string', 'number'])
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value, values: newProps.values });
    },
    /**
    * Get the css class of the field component.
    */
    _className: function _className() {
        var stateClass = this.state.error ? 'is-invalid' : '';
        return 'mdl-grid ' + stateClass;
    },
    /** @inheritdoc */
    render: function render() {
        var error = this.state.error;
        var _props = this.props;
        var FieldComponent = _props.FieldComponent;
        var InputLabelComponent = _props.InputLabelComponent;
        var domain = _props.domain;
        var codeResolver = _props.codeResolver;
        var searcher = _props.searcher;
        var isRequired = _props.isRequired;
        var values = _props.values;
        var hasLabel = _props.hasLabel;
        var isEdit = _props.isEdit;

        var isCustomComponent = FieldComponent || InputLabelComponent;
        var autocomplete = this.autocomplete;
        var label = this.label;
        var input = this.input;
        var select = this.select;
        var display = this.display;

        return React.createElement(
            'div',
            { className: 'mdl-grid', 'data-domain': domain, 'data-focus': 'field', 'data-mode': isEdit ? 'edit' : 'consult', 'data-required': isRequired, 'data-valid': !error },
            isCustomComponent && this._renderFieldComponent(),
            !isCustomComponent && hasLabel && label(),
            !isCustomComponent && React.createElement(
                'div',
                { className: '' + this._getContentGridClassName(), 'data-focus': 'field-value-container' },
                codeResolver && searcher ? autocomplete() : isEdit ? values ? select() : input() : display()
            )
        );
    }
};
module.exports = builder(FieldMixin);