var React = require('react');
var Field = require('../../field').component;
var Button = require('../../button/action').component;
var List = require('../../list');
module.exports = {
/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 * @param {object} options - An object which contains all options for the built of the field.
 * @returns {object} - A React Field.
 */
fieldFor: function(name, options) {
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  options = options || {};
  var isEdit = options.isEdit !== undefined ? options.isEdit : this.state.isEdit;
  //Maybe allow to overrife fieldFor here such as def.fieldFor?.
  return React.createElement(Field, {
    name: `${this.definitionPath}.${name}`,
    ref: name,
    value: this.state[name],
    error: this.state.error ? this.state.error[name] : undefined,
    validator: def.validator,
    FieldComponent: def.FieldComponent,
    InputLabelComponent: def.InputLabelComponent,
    InputComponent: def.InputComponent,
    isEdit: isEdit,
    formatter: def.formatter
  });
},
/**
 * Select component for the component.
 * @param {string} name - property name.
 * @param {string} listName - list name.
 * @param {object} options - options object.
 * @returns {object} - A React Field.
 */
selectFor: function(name, listName, options){
  options = options || {};
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  listName = listName || def.listName;
  var isEdit = options.idEdit || true;
  //Check listName

  return React.createElement(Field, {
    name: name,
    ref: name,
    value: this.state[name],
    error: this.state.error ? this.state.error[name] : undefined,
    validator: def.validator,
    values: this.state.reference[listName], //Options to be rendered.
    FieldComponent: def.FieldComponent,
    InputLabelComponent: def.InputLabelComponent,
    isEdit: isEdit
  });
},
/**
 * Display a field.
 * @param {string} name - property name.
 * @param {object} options - options object.
 * @returns {object} - A React Field.
 */
displayFor: function(name, options){
  options = options || {};
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  var listName = options.listName || def.listName;
  return React.createElement(Field, {
    name: name,
    ref: name,
    value: this.state[name],
    values: this.state.reference ? this.state.reference[listName]: undefined, //Options to be rendered.
    FieldComponent: def.FieldComponent,
    InputLabelComponent: def.InputLabelComponent,
    isEdit: false
  });
},
/**
 * Display a list component.
 * @param {string} name - Property name.
 * @param {object} options - Options object.
 * @returns {object} - The react component for the line.
 */
listFor: function listFor(name, options){
  options = options || {};
  return React.createElement( List, {
    data: this.state[name],
    line: options.LineComponent || this.props.LineComponent || this.LineComponent,
    perPage: options.perPage || 5
  });
},
/**
 * Button delete generation.
 * @returns {object} - A Reacte button.
 */
buttonDelete: function buttonDelete() {
  return React.createElement(Button, {
    label: 'delete',
    type: 'button',
    css: 'delete'
  });
},
buttonEdit: function buttonEdit() {
  var form = this;
  return React.createElement(Button, {
    label: 'edit',
    type: 'button',
    css: 'edit',
    handleOnClick: function handleOnClickEdit(){
      form.setState({isEdit: !form.state.isEdit});
    }
  });
},
buttonCancel: function buttonCancel() {
  var form = this;
  return React.createElement(Button, {
    label: 'cancel',
    type: 'button',
    css: 'cancel',
    handleOnClick: function handleOnClickCancel(){
      console.log('cancel');
      form.setState({isEdit: !form.state.isEdit});
    }
  });
},
/**
 * Button save generation.
 * @returns {object} - A React button.
 */
buttonSave: function() {
  var form = this;

  return React.createElement(Button, {
    label: 'save',
    type: 'submit',
    css: 'primary',
    /*handleOnClick: function(e){
      if(form.validate()){
        form.action.save(form._getEntity());
      }
      return;
    }*/
  });
}};
