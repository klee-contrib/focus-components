var React = require('react');
var Field = require('../field').component;
var Field = require('../field').component;
var Button = require('../button/action').component;
module.exports = {/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 */
fieldFor: function(name) {
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  //Maybe allow to overrife fieldFor here such as def.fieldFor?.
  return React.createElement(Field, {
    name: name,
    ref: name,
    value: this.state[name],
    error: this.state.error ? this.state.error[name] : undefined,
    validator: def.validator,
    FieldComponent: def.FieldComponent, 
    InputLabelComponent: def.InputLabelComponent
  });
},
/**
 * Save button/
 */
buttonDelete: function() {
  return React.createElement(Button, {
    label: "delete",
    type: "button",
    css: "delete"
  });
},
/**
 * Save button/
 */
buttonSave: function() {
  return React.createElement(Button, {
    label: "save",
    type: "submit",
    css: "primary"
  });
}};
