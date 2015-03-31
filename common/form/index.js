var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var getEntityDefinition = require('focus').definition.entity.builder.getEntityInformations;
var builtInComponents = require('./mixin/built-in-components');
var referenceBehaviour = require('./mixin/reference-behaviour');
var storeBehaviour = require('./mixin/store-behaviour');
var actionBehaviour = require('./mixin/action-behaviour');

var isEmpty = require('lodash/lang/isEmpty');
/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [referenceBehaviour, storeBehaviour, actionBehaviour, builtInComponents],
  /** @inheritdoc */
  getDefaultProps: function getFormDefaultProps() {
    return {
      /**
       * Defines it the form can have  an edit mode.
       * @type {Boolean}
       */
      hasEdit: true,
      /**
       * Defines
       * @type {Boolean}
       */
      isEdit: false,
      /**
       * Style of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      /**
       * Identifier of the entity.
       * @type {[type]}
       */
      id: this.props.id,
      isEdit: this.props.isEdit
    };
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function onFormStoreChangeHandler() {
    this.setState(this._getStateFromStores());
  },
  /** @inheritdoc */
  callMountedActions: function formCallMountedActions() {
    this._loadData();
    this._loadReference();
  },
  /** @inheritdoc */
  componentWillMount: function formWillMount(){
    this._buildDefinition();
    this._buildReference();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    this._registerListeners();
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    this._unRegisterListeners();
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition(){
    if(!this.definitionPath){
      throw new Error('the definition path should be defined to know the domain of your entity property.');
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @returns {boolean} - A boolean ttue if the
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      var validationRes = this.refs[inptKey].validate();
      if(validationRes !== undefined){
        assign(validationMap, {
          [inptKey]: validationRes
        });
      }
    }
    if(isEmpty(validationMap)){
      return true;
    }

    return false;
  },
  _editClass: function(){
    if(this.editClass){return this.editClass(); }
    return `form-${this.state.isEdit ? 'edit' : 'consult'}`;
  },
  _className: function formClassName() {
    return `form-horizontal ${this.props.style.className} ${this._editClass()}`;
  },
  _renderActions: function renderActions(){
    if(this.renderActions){return this.renderActions(); }
    if(this.state.isEdit){
      return this._renderEditActions();
    }
    return this._renderConsultActions();
  },
  _renderEditActions: function _renderEditActions(){
    if(this.renderEditActions){return this.renderEditActions(); }
    return (
      <div className="button-bar">
        {this.buttonCancel()}
        {this.buttonSave()}
      </div>
    );
  },
  _renderConsultActions: function _renderConsultActions(){
    if(this.renderConsultActions){return this.renderConsultActions(); }
    return this.buttonEdit();
  },
  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if(this.validate()){
      this.action.save(this._getEntity());
    }
    //return false;
  },
  /** @inheritdoc */
  render: function renderForm() {
    return (
      <form
        onSubmit={this._handleSubmitForm}
        className={this._className()}
      >
        <fieldset>
          {this.renderContent()}
        </fieldset>
      </form>
    );
  }
};

module.exports = builder(formMixin);
