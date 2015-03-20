var React = require('react');
var Field = require('../../field').component;
var Field = require('../../field').component;
var Button = require('../../button/action').component;
module.exports = {
/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 * @returns {object} - A React Field.
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
 * Button delete generation.
 * @returns {object} - A Reacte button.
 */
buttonDelete: function() {
  return React.createElement(Button, {
    label: 'delete',
    type: 'button',
    css: 'delete'
  });
},
/**
 * Button save generation.
 * @returns {object} - A Reacte button.
 */
buttonSave: function() {
  return React.createElement(Button, {
    label: 'save',
    type: 'submit',
    css: 'primary'
  });
}};
