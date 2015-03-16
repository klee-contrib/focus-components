var React = require('react');
var Field = require('../field').component;
var Field = require('../field').component;
var Button = require('../button/action').component;
module.exports = {/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 */
fieldFor: function(name) {
  return React.createElement(Field, {
    name: name,
    ref: name,
    value: this.state[name],
    error: this.state.error ? this.state.error[name] : undefined
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
