const assign = require('object-assign');
const {isUndefined} = require('lodash/lang');
/**
 * Identity function
 * @param  {object} d - data to treat.
 * @return {object}  - The same object.
 */
function identity(d){
    return d;
}

const fieldBehaviourMixin = {
    /**
    * Build the field properties.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field
    * @param {object} context - Function context, this by default.
    * @returns {object} - The constructed props for the field.
    */
    _buildFieldProps(name, options = {}, context){
        context = context || this;
        //Properties.
        const isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
        const value = options.value !== undefined ? options.value : context.state[name];
        const def = (context.definition && context.definition[name]) ? context.definition[name] : {};
        const listName = options.listName || def.listName;
        //hasLabel
        const hasLabel = (function hasLabel(){
            if(options.hasLabel !== undefined){
                return options.hasLabel;
            }
            if(def.hasLabel !== undefined){
                return options.hasLabel;
            } return true;
        }());
        //Build a container for the props.
        name = options.name || `${this.definitionPath}.${name}`;
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
            options: options.options || def.options //Add options to the fields
        };
        //Extend the options object in order to be able to specify more options to thie son's component.
        let fieldProps = assign(options, propsContainer, options.options || def.options);
        // Values list.
        const refContainer = options.refContainer || def.refContainer || context.state.reference;
        if(refContainer && refContainer[listName]){
            assign(fieldProps, {values: refContainer[listName]});
        }
        return fieldProps;
    }
};


module.exports = fieldBehaviourMixin;
