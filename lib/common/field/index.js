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

            /**
            * Edition mode of the field.
            * @type {Boolean}
            */
            isEdit: true,
            /**
            * HTML input type.
            * @type {String}
            */
            type: 'text',
            /**
            * Field name.
            * @type {string}
            */
            name: undefined,
            /**
            * Css properties of the component.
            * @type {Object}
            */
            style: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        isEdit: type('bool'),
        type: type('string'),
        name: type('string'),
        value: type(['string', 'number'])
    },
    /** @inheritdoc */
    componentWillReceiveProps: function fieldWillReceiveProps(newProps) {
        this.setState({ value: newProps.value, values: newProps.values });
    },
    /**
    * Get the css class of the field component.
    */
    _className: function _className() {
        var stateClass = this.state.error ? 'has-feedback has-error' : '';
        return 'form-group ' + stateClass + ' ' + this.props.style.className;
    },
    /** @inheritdoc */
    render: function render() {
        var _props = this.props;
        var domain = _props.domain;
        var isRequired = _props.isRequired;
        var isEdit = _props.isEdit;
        var values = _props.values;
        var input = this.input;
        var label = this.label;
        var select = this.select;
        var display = this.display;
        var help = this.help;
        var error = this.error;
        var _className = this._className;

        return React.createElement(
            'div',
            { className: _className(), 'data-domain': domain, 'data-focus': 'field', 'data-mode': isEdit ? 'edit' : 'consult', 'data-required': isRequired },
            label(),
            isEdit ? values ? select() : input() : display(),
            help(),
            error()
        );
    }
};
module.exports = builder(FieldMixin);