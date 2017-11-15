import assign from 'object-assign';

import isUndefined from 'lodash/lang/isUndefined';
import isObject from 'lodash/lang/isObject';
import identity from 'lodash/utility/identity';

const fieldBehaviourMixin = {
    _modifiedFields: [],
    _defaultOnChange(fieldname, value) {
        this.setState({
            [fieldname]: value
        })
    },
    _buildResetState() {
        if (this.buildResetState) {
            return this.buildResetState(this._modifiedFields);
        }
        return this._modifiedFields.reduce((acc, value) => {
            acc[value] = null;
            return acc;
        }, {});
    },
    _wrappedOnChange(onChange, fieldname, value) {
        if (this._modifiedFields.indexOf(fieldname) === -1) {
            this._modifiedFields.push(fieldname);
        }
        if (onChange) {
            onChange(value);
        } else {
            this._defaultOnChange(fieldname, value);
        }
    },
    /**
    * Build the field properties.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field
    * @param {object} context - Function context, this by default.
    * @returns {object} - The constructed props for the field.
    */
    _buildFieldProps(name, options = {}, context) {
        context = context || this;
        //Properties.
        const isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
        const value = options.value !== undefined ? options.value : context.state[name];
        const def = (context.definition && context.definition[name]) ? context.definition[name] : {};
        const listName = options.listName || def.listName;
        //hasLabel
        const hasLabel = (function hasLabel() {
            if (options.hasLabel !== undefined) {
                return options.hasLabel;
            }
            if (def.hasLabel !== undefined) {
                return options.hasLabel;
            } return true;
        }());
        //Build a container for the props.
        const baseName = name;
        name = options.name || `${this.definitionPath}.${name}`;
        const onChange = (value) => this._wrappedOnChange(options.onChange || (options.options || {}).onChange || def.onChange, baseName, value);

        const propsContainer = {
            name: name,
            label: def.label || options.label || name,
            ref: name,
            value: value,
            domain: options.domain || def.domain,
            error: context.state.error ? context.state.error[name] : undefined,
            locale: def.locale,
            format: def.format,
            //Mode
            isEdit: isEdit,
            hasLabel: hasLabel,
            isRequired: (!isUndefined(options.isRequired) && options.isRequired) || def.isRequired || def.required, //legacy on required on model generation.
            //Style
            style: options.style,
            // Type
            type: def.type,
            //Methods
            validator: def.validator,
            formatter: def.formatter || identity,
            unformatter: def.unformatter || identity,
            //Component
            FieldComponent: def.FieldComponent,
            InputLabelComponent: def.InputLabelComponent,
            InputComponent: def.InputComponent,
            SelectComponent: def.SelectComponent,
            TextComponent: def.TextComponent,
            DisplayComponent: def.DisplayComponent,
            LabelComponent: def.LabelComponent,
            AutocompleteSelectComponent: def.AutocompleteSelectComponent,
            AutocompleteTextComponent: def.AutocompleteTextComponent,
            options: options.options || def.options //Add options to the fields
        };
        //Extend the options object in order to be able to specify more options to thie son's component.
        let fieldProps = assign(propsContainer, options, options.options || def.options);
        // Forcing the use of the wrapper for onChange
        fieldProps.onChange = onChange;

        // Values list.
        const refContainer = options.refContainer || def.refContainer || context.state.reference;
        // case no props.values and then
        if (!(options.hasOwnProperty('values')) && isObject(refContainer) && refContainer.hasOwnProperty(listName)) {
            assign(fieldProps, { values: refContainer[listName] || [] });
        }
        return fieldProps;
    }
};

export default fieldBehaviourMixin;
