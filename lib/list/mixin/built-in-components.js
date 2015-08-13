'use strict';

var React = require('react');
var fielBehaviourMixin = require('../../common/mixin/field-component-behaviour');
var assign = require('object-assign');
var Field = require('../../common/field').component;
var Text = require('../../common/display/text').component;

var builtInComponentsMixin = {
    /**
     * inherited minxins
     */
    mixins: [fielBehaviourMixin],

    /**
     * @inheritDoc
     */
    getDefaultProps: function getbuiltInComponentsMixinDefaultProps() {
        return {
            isEdit: false
        };
    },

    /**
     * create an edit field for the given property metadata.
     * @param {string} name - name of the field.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    fieldFor: function fieldForInLine(name, options) {
        options = assign({}, {
            isEdit: this.props.isEdit,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference,
            style: { className: 'form-list' }
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },
    /**
     * Add a select with a list name component It is a shortcut for the fieldComponent.
     * @param {string} name         - The property name.
     * @param {string} referenceKey - The list name in the references.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    selectFor: function selectForInLine(name, referenceKey, options) {
        options = options || {};
        options.listName = referenceKey;
        return this.fieldFor(name, options);
    },
    /**
     * Display a field.
     * @param {string} name - property name.
     * @param {object} options - options object.
     * @returns {object} - A React Field in display mode.
     */
    displayFor: function displayForInLine(name, options) {
        options = assign({}, {
            isEdit: false,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference,
            style: { className: 'form-list' }
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },

    /**
     * Display the text for a given property.
     * @param {string} name  - property name.
     * @param {object} options - Option object
     * @returns {object} - A React component.
     */
    textFor: function textFor(name, options) {
        options = options || {};
        var def = this.definition && this.definition[name] ? this.definition[name] : {};
        return React.createElement(Text, {
            name: options.name || this.definitionPath + '.' + name,
            style: options.style,
            FieldComponent: def.FieldComponent,
            formatter: options.formatter || def.formatter,
            value: this.props.data[name]
        });
    }
};

module.exports = builtInComponentsMixin;