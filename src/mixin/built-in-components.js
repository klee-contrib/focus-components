// Dependencies
import React from 'react';
import { changeMode } from 'focus-core/application';
import assign from 'object-assign';

import result from 'lodash/object/result';
import find from 'lodash/collection/find';
import defaultsDeep from 'lodash/object/defaultsDeep';

// Components
import { component as Field } from './field';
import Text from '../components/display/text';
import Button from '../components/button';

// Mixins
import fieldComponentBehaviour from './field-component-behaviour';

export default {
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
    autocompleteSelectFor(name, { keyResolver, querySearcher }, options = {}) {
        options = assign({}, options);
        options.keyResolver = keyResolver;
        options.querySearcher = querySearcher;
        const fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteTextFor(name, { querySearcher }, options = {}) {
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
    dualFieldFor({ consultField, editField }) {
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
        const { valueKey, labelKey, values } = fieldProps;
        const _processValue = values ? result(find(values, { [valueKey || 'code']: value }), labelKey || 'label') : value;
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
            this.setState({ isEdit: !this.state.isEdit }, () => {
                changeMode('edit', 'consult');
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
            // Change the mode.
            // Read the state from the stores, it should contain the last data from the server.
            this.setState(defaultsDeep({ isEdit: false }, this._getStateFromStores(), this._buildResetState()), () => {
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
        const { isLoading } = this.state;
        const handleOnClick = () => {
            this.clearError();
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
            <Field {...fieldProps} />
        );
    }
};
