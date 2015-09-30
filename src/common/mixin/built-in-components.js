// Dependencies

const React = require('react');
const changeMode = require('focus-core').application.changeMode;
const assign = require('object-assign');
const result = require('lodash/object/result');
const find = require('lodash/collection/find');
// Components

const Field = require('../field').component;
const Text = require('../display/text').component;
const Button = require('../button/action').component;
const MemoryList = require('../list').component;
const Table = require('../../list/table').list.component;
const List = require('../../list/selection').list.component;


// Mixins

const fieldComponentBehaviour = require('./field-component-behaviour');

module.exports = {
    mixins: [fieldComponentBehaviour],
    /**
    * Create a field for the given property metadata.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field.
    * @returns {object} - A React Field.
    */
    fieldFor(name, options) {
        options = assign({}, options);
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteFor(name, {codeResolver, searcher}, options = {}) {
        options = assign({}, options);
        options.codeResolver = codeResolver;
        options.searcher = searcher;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    /**
    * Display two different fields, depending on wheter the user is editing the form or not
    * @param  {Object} config the configuration, with the structure {consultField: ..., editField: ...}
    * @return {Object} the rendered resulting field
    */
    dualFieldFor({consultField, editField}) {
        return this.state.isEdit ? editField : consultField;
    },
    /**
    * Select component for the component.
    * @param {string} name - property name.
    * @param {string} listName - list name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    selectFor(name, listName, options){
        options = options || {};
        options.listName = listName || options.listName;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    /**
    * Display a field.
    * @param {string} name - property name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    displayFor(name, options){
        options = options || {};
        options.isEdit = false;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    /**
    * Display the text for a given property.
    * @param {string} name  - property name.
    * @param {object} options - Option object
    * @returns {object} - A React component.
    */
    textFor(name, options){
        options = options || {};
        const def = (this.definition && this.definition[name]) ? this.definition[name] : {};
        const fieldProps = this._buildFieldProps(name, options, this);
        const value = this.state[name];
        const {valueKey, labelKey, values} = fieldProps;
        const _processValue = values ? result(find(values, {[valueKey || 'code']: value}), labelKey || 'label') : value;
        return (
            <Text
                formatter={options.formatter || def.formatter}
                name={options.name || `${this.definitionPath}.${name}`}
                style={options.style}
                value={_processValue}
                />
        );
    },
    /**
    * Display a list component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    listFor(name, options) {
        options = options || {};
        options.reference = options.reference || this.state.reference;
        options.listComponent = options.listComponent || List;
        const listForProps = assign({}, options, {
            data: this.state[name],
            lineComponent: options.lineComponent || this.props.lineComponent || this.lineComponent,
            perPage: options.perPage || 5,
            reference: options.reference,
            isEdit: options.isEdit !== undefined ? options.isEdit : false
        });
        return (
            <MemoryList {...listForProps}/>
        );
    },

    /**
    * Display a table component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    tableFor(name, options){
        options.listComponent = options.listComponent || Table;
        return this.listFor(name, options);
    },
    /**
    * Button delete generation.
    * @returns {object} - A Reacte button.
    */
    buttonDelete() {
        const handleOnClick = () => {
            this.action.delete.call(this, this._getEntity());
        };
        return (
            <Button
                handleOnClick={handleOnClick}
                icon='trash'
                iconLibrary='font-awesome'
                label='button.delete'
                shape={null}
                style={{className: 'delete'}}
                type='button'
                />
        );
    },
    /**
    * Edition button.
    * @returns {object} - The React component for the button.
    */
    buttonEdit() {
        const handleOnClick = () => {
            this.setState({isEdit: !this.state.isEdit}, () => {
                changeMode('edit', 'consult');
            });
        };
        return (
            <Button
                handleOnClick={handleOnClick}
                icon='pencil'
                iconLibrary='font-awesome'
                label='button.edit'
                shape={null}
                style={{className: 'edit'}}
                type='button'
                />
        );
    },
    /**
    * Cancel button.
    * @returns {object} - The React component for the button.
    */
    buttonCancel() {
        const handleOnClick = () => {
            this.clearError();
            this.setState({isEdit: !this.state.isEdit}, () => {
                changeMode('consult', 'edit');
            });
        };
        return (
            <Button
                handleOnClick={handleOnClick}
                icon='undo'
                iconLibrary='font-awesome'
                label='button.cancel'
                shape={null}
                style={{className: 'cancel'}}
                type='button'
                />
        );
    },
    /**
    * Button save generation.
    * @returns {object} - A React  save button.
    */
    buttonSave() {
        const handleOnClick = () => {
            if (this._validate()) {
                this.action.save.call(this, this._getEntity());
            }
        };
        return (
            <Button
                handleOnClick={handleOnClick}
                icon='floppy-o'
                iconLibrary='font-awesome'
                label='button.save'
                shape={null}
                style={{className: 'delete'}}
                type='button'
                />
        );
    },
    /**
    * Render a field with the provided props.
    * @param  {object} fieldProps the props
    * @return {XML} rendered field
    */
    _renderField(fieldProps) {
        return (
            <Field {...fieldProps}/>
        );
    }
};
