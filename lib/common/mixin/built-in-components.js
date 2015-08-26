// Dependencies

'use strict';

var React = require('react');
var changeMode = require('focus').application.changeMode;
var assign = require('object-assign');

// Components

var Field = require('../field').component;
var Text = require('../display/text').component;
var Button = require('../button/action').component;
var MemoryList = require('../list').component;
var Table = require('../../list/table').list.component;
var List = require('../../list/selection').list.component;

// Mixins

var fieldComponentBehaviour = require('./field-component-behaviour');

module.exports = {
    mixins: [fieldComponentBehaviour],
    /**
    * Create a field for the given property metadata.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field.
    * @returns {object} - A React Field.
    */
    fieldFor: function fieldFor(name, options) {
        options = assign({}, options);
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    /**
    * Display two different fields, depending on wheter the user is editing the form or not
    * @param  {Object} config the configuration, with the structure {consultField: ..., editField: ...}
    * @return {Object} the rendered resulting field
    */
    dualFieldFor: function dualFieldFor(_ref) {
        var consultField = _ref.consultField;
        var editField = _ref.editField;

        return this.state.isEdit ? editField : consultField;
    },
    /**
    * Select component for the component.
    * @param {string} name - property name.
    * @param {string} listName - list name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    selectFor: function selectFor(name, listName, options) {
        options = options || {};
        options.listName = listName || options.listName;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    /**
    * Display a field.
    * @param {string} name - property name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    displayFor: function displayFor(name, options) {
        options = options || {};
        options.isEdit = false;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
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
            FieldComponent: def.FieldComponent,
            formatter: options.formatter || def.formatter,
            name: options.name || this.definitionPath + '.' + name,
            style: options.style,
            value: this.state[name]
        });
    },
    /**
    * Display a list component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    listFor: function listFor(name, options) {
        options = options || {};
        options.reference = options.reference || this.state.reference;
        options.listComponent = options.listComponent || List;
        var listForProps = assign({}, options, {
            data: this.state[name],
            lineComponent: options.lineComponent || this.props.lineComponent || this.lineComponent,
            perPage: options.perPage || 5,
            reference: options.reference,
            isEdit: options.isEdit !== undefined ? options.isEdit : false
        });
        return React.createElement(MemoryList, listForProps);
    },

    /**
    * Display a table component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    tableFor: function tableFor(name, options) {
        options.listComponent = options.listComponent || Table;
        return this.listFor(name, options);
    },
    /**
    * Button delete generation.
    * @returns {object} - A Reacte button.
    */
    buttonDelete: function buttonDelete() {
        var _this = this;

        var handleOnClick = function handleOnClick() {
            _this.action['delete'](_this._getEntity());
        };
        return React.createElement(Button, {
            handleOnClick: handleOnClick,
            icon: 'trash',
            label: 'button.delete',
            shape: 'link',
            style: { className: 'delete' },
            type: 'button'
        });
    },
    /**
    * Edition button.
    * @returns {object} - The React component for the button.
    */
    buttonEdit: function buttonEdit() {
        var _this2 = this;

        var handleOnClick = function handleOnClick() {
            _this2.setState({ isEdit: !_this2.state.isEdit }, function () {
                changeMode('edit', 'consult');
            });
        };
        return React.createElement(Button, {
            handleOnClick: handleOnClick,
            icon: 'pencil',
            label: 'button.edit',
            shape: 'link',
            style: { className: 'delete' },
            type: 'button'
        });
    },
    /**
    * Cancel button.
    * @returns {object} - The React component for the button.
    */
    buttonCancel: function buttonCancel() {
        var _this3 = this;

        var handleOnClick = function handleOnClick() {
            _this3.clearError();
            _this3.setState({ isEdit: !_this3.state.isEdit }, function () {
                changeMode('consult', 'edit');
            });
        };
        return React.createElement(Button, {
            handleOnClick: handleOnClick,
            icon: 'undo',
            label: 'button.cancel',
            shape: 'link',
            style: { className: 'delete' },
            type: 'button'
        });
    },
    /**
    * Button save generation.
    * @returns {object} - A React  save button.
    */
    buttonSave: function buttonSave() {
        var _this4 = this;

        var handleOnClick = function handleOnClick() {
            if (_this4._validate()) {
                _this4.action.save.call(_this4, _this4._getEntity());
            }
        };
        return React.createElement(Button, {
            handleOnClick: handleOnClick,
            icon: 'floppy-o',
            label: 'button.save',
            shape: 'link',
            style: { className: 'delete' },
            type: 'button'
        });
    },
    /**
    * Render a field with the provided props.
    * @param  {object} fieldProps the props
    * @return {XML} rendered field
    */
    _renderField: function _renderField(fieldProps) {
        return React.createElement(Field, fieldProps);
    }
};