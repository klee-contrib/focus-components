
var assign = require('object-assign');
var fieldBehaviourMixin = {
  /**
   * Build the field properties.
   * @param {string} name - property name.
   * @param {object} options - An object which contains all options for the built of the field
   * @param {object} context - Function context, this by default.
   * @returns {object} - The constructed props for the field.
   */
  _buildFieldProps: function buildFieldProps(name, options, context){
    options = options || {};
    context = context || this;
    //Properties.
    var isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
    var def = (context.definition && context.definition[name]) ? context.definition[name] : {};
    var listName = options.listName || def.listName;
    //Build a container for the props.
    var propsContainer = {
      name: `${this.definitionPath}.${name}`,
      ref: name,
      value: context.state[name],
      error: context.state.error ? context.state.error[name] : undefined,
      //Mode
      isEdit: isEdit,
      //Style
      style: options.style,
      //Methods
      validator: def.validator,
      formatter: def.formatter,
      //component: {Field: def.FieldComponent, LabelAndInput: def.LabelAndInputComponent, Input: def.InputComponent, Display: def.DisplayComponent, Text: def.TextComponent}
      FieldComponent: def.FieldComponent,
      InputLabelComponent: def.InputLabelComponent,
      InputComponent: def.InputComponent,
      TextComponent: def.TextComponent,
      DisplayComponent: def.DisplayComponent
    };
    // Values list.
    var refContainer = options.refContainer || this.state;
    if(context[refContainer].reference && context[refContainer].reference[listName]){
      assign(propsContainer, {values: context[refContainer].reference[listName]});
    }
    return propsContainer;
  }
};


module.exports = fieldBehaviourMixin;
