var React = require('react');
var Field = require('../field').component;
var Text = require('../display/text').component;
var Button = require('../button/action').component;
var memoryList = require('../list').component;
var fieldComponentBehaviour = require('./field-component-behaviour');
var Table = require('../../list/table').list.component;
var List = require('../../list/selection').list.component;
var dispatcher = require('focus').dispacther;
var changeMode = require('focus').application.changeMode;

var assign = require('object-assign');
module.exports = {
  mixins: [fieldComponentBehaviour],
/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 * @param {object} options - An object which contains all options for the built of the field.
 * @returns {object} - A React Field.
 */
fieldFor: function(name, options) {
  options = assign({}, options);
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
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
selectFor: function(name, listName, options){
  options = options || {};
  options.listName = listName || options.listName;
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
},
/**
 * Display a field.
 * @param {string} name - property name.
 * @param {object} options - options object.
 * @returns {object} - A React Field.
 */
displayFor: function displayFor(name, options){
  options = options || {};
  options.isEdit = false;
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
},
/**
 * Display the text for a given property.
 * @param {string} name  - property name.
 * @param {object} options - Option object
 * @returns {object} - A React component.
 */
textFor: function textFor(name, options){
  options = options || {};
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  return React.createElement(Text, {
    name: options.name || `${this.definitionPath}.${name}`,
    style: options.style,
    FieldComponent: def.FieldComponent,
    formatter: options.formatter || def.formatter,
    value: this.state[name]
  });
},
/**
 * Display a list component.
 * @param {string} name - Property name.
 * @param {object} options - Options object.
 * @returns {object} - The react component for the list.
 */
listFor: function listFor(name, options) {
  options = options || {};
  options.reference = options.reference || this.state.reference;
  options.listComponent = options.listComponent || List;
  var listForProps = assign({}, options, {
    data: this.state[name],
    lineComponent: options.lineComponent || this.props.lineComponent || this.lineComponent,
    perPage: options.perPage || 5,
    reference: options.reference,
    isEdit: options.isEdit !== undefined ? options.isEdit : false
  });
  return React.createElement(memoryList, listForProps);
},

/**
 * Display a table component.
 * @param {string} name - Property name.
 * @param {object} options - Options object.
 * @returns {object} - The react component for the list.
 */
tableFor: function tableFor(name, options){
  options.listComponent = options.listComponent || Table;
  return this.listFor(name, options);
},
/**
 * Button delete generation.
 * @returns {object} - A Reacte button.
 */
buttonDelete: function buttonDelete() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.delete',
    type: 'button',
    shape: 'link',
    icon: 'trash',
    style: {className: 'delete'},
    handleOnClick: function handleOnClickEdit(){
      form.action.delete(form._getEntity());
    }
  });
},
/**
 * Edition button.
 * @returns {object} - The React component for the button.
 */
buttonEdit: function buttonEdit() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.edit',
    shape: 'link',
    type: 'button',
    icon: 'pencil',
    handleOnClick: function handleOnClickEdit(){
      form.setState({isEdit: !form.state.isEdit},function(){
        changeMode('edit', 'consult')
      });
    }
  });
},
/**
 * Cancel button.
 * @returns {object} - The React component for the button.
 */
buttonCancel: function buttonCancel() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.cancel',
    shape:'link',
    type: 'button',
    icon: 'undo',
    handleOnClick: function handleOnClickCancel(){
      form.clearError();
      form.setState({isEdit: !form.state.isEdit},function(){
        changeMode('consult', 'edit')});
    }
  });
},
/**
 * Button save generation.
 * @returns {object} - A React  save button.
 */
buttonSave: function() {
  //var form = this;
  return React.createElement(Button, {
    label: 'button.save',
    type: 'submit',
    shape:'link',
    icon: 'floppy-o'
    /*handleOnClick: function handleClickOnSave(e){
      if(form.validate()){
        form.action.save(form._getEntity());
      }
      return;
    }*/
  });
}};
