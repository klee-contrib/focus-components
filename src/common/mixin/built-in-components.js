// Dependencies

const React = require('react');
const changeMode = require('focus').application.changeMode;
const assign = require('object-assign');

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
        return (
            <Text
                FieldComponent={def.FieldComponent}
                formatter={options.formatter || def.formatter}
                name={options.name || `${this.definitionPath}.${name}`}
                style={options.style}
                value={this.state[name]}
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
            this.action.delete(this._getEntity());
        };
        return (
            <Button
                handleOnClick={handleOnClick}
                icon='trash'
                label='button.delete'
                shape='link'
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
                label='button.edit'
                shape='link'
                style={{className: 'delete'}}
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
                label='button.cancel'
                shape='link'
                style={{className: 'delete'}}
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
                label='button.save'
                shape='link'
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
