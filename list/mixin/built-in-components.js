var React = require('react');
var fielBehaviourMixin = require('../../common/mixin/field-component-behaviour');
var assign = require('object-assign');
var Field = require('../../common/field').component;

var builtInComponentsMixin = {
    mixins: [fielBehaviourMixin],

    /**
     * create an edit field for the given property metadata.
     * @param {string} name - name of the field.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    fieldFor: function fieldFor(name, options){
        options = assign({}, {
            isEdit: this.props.isEdit,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },

    /**
     * Display a field.
     * @param {string} name - property name.
     * @param {object} options - options object.
     * @returns {object} - A React Field in display mode.
     */
    displayFor: function displayFor(name, options){
        options = assign({}, {
            isEdit: false,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference
        }, options);

        var fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    }
};

module.exports = builtInComponentsMixin;
