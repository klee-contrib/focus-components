// Dependencies

const React = require('react');
import {changeMode} from 'focus-core/application';
const assign = require('object-assign');
const result = require('lodash/object/result');
const find = require('lodash/collection/find');
// Components

const Field = require('../field').component;
const Text = require('../../components/display/text');
const Button = require('../../components/button');
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
    autocompleteFor() {
        throw new Error('Form\'s autocompleteFor method is deprecated, in order to use the deprecated component, please use this.deprecatedAutocompleteFor. You must migrate all the autocompleteFor to autocompleteSelectFor or autocompleteTextFor in order to follow the library evolutions.');
    },
    deprecatedAutocompleteFor(name, {codeResolver, searcher}, options = {}) {
        options = assign({}, options);
        options.codeResolver = codeResolver;
        options.searcher = searcher;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteSelectFor(name, {keyResolver, querySearcher}, options = {}) {
        options = assign({}, options);
        options.keyResolver = keyResolver;
        options.querySearcher = querySearcher;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteTextFor(name, {querySearcher}, options = {}) {
        options = assign({}, options);
        options.querySearcher = querySearcher;
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
    selectFor(name, listName, options) {
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
    displayFor(name, options) {
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
    textFor(name, options) {
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
            LineComponent: options.lineComponent || options.LineComponent || this.props.LineComponent || this.LineComponent || this.lineComponent,
            perPage: options.perPage || 5,
            reference: options.reference,
            isEdit: options.isEdit !== undefined ? options.isEdit : false
        });
        return (
            <MemoryList ref='list' {...listForProps}/>
        );
    },

    /**
    * Display a table component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    tableFor(name, options) {
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
            icon='delete'
            label='button.delete'
            shape={null}
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
                this.clearError();
            });
        };
        return (
            <Button
            handleOnClick={handleOnClick}
            icon='edit'
            label='button.edit'
            shape={null}
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
            this.setState({
                // Change the mode.
                isEdit: !this.state.isEdit,
                // Read the state from the stores, it should contain the last data from the server.
                ...this._getStateFromStores()
            }, () => {
                changeMode('consult', 'edit');
            });
        };
        return (
            <Button handleOnClick={handleOnClick} icon='undo' label='button.cancel' shape={null} type='button' />
        );
    },
    /**
    * Button save generation.
    * @returns {object} - A React  save button.
    */
    buttonSave() {
        const {isLoading} = this.state;
        const handleOnClick = () => {
            if (this._validate()) {
                this.action.save.call(this, this._getEntity());
            }
        };
        return (
            <Button
            handleOnClick={handleOnClick}
            icon='save'
            label='button.save'
            shape={null}
            type='button'
            isLoading={isLoading}
            processLabel='button.saving'
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
