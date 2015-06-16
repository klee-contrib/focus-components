var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var {isEmpty, isFunction} = require('lodash/lang');

// Common mixins.
var definitionMixin = require('../mixin/definition');
//var fieldComponentBehaviour = require('../mixin/field-component-behaviour');
var builtInComponents = require('../mixin/built-in-components');
var storeBehaviour = require('../mixin/store-behaviour');

//Form mixins.
var referenceBehaviour = require('./mixin/reference-behaviour');
var actionBehaviour = require('./mixin/action-behaviour');

/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [definitionMixin, referenceBehaviour, storeBehaviour, actionBehaviour, builtInComponents],
  /** @inheritdoc */
  getDefaultProps: function getFormDefaultProps() {
    return {
      hasForm: true,
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
  /** @inheritdoc */
  callMountedActions: function formCallMountedActions() {
    this._loadData();
    this._loadReference();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },

  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @returns {boolean} - A boolean ttue if the
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      //validate only the reference elements which have valide function
      // todo: @pierr see if it is sufficient
      if(isFunction(this.refs[inptKey].validate)){
        var validationRes = this.refs[inptKey].validate();
        if(validationRes !== undefined){
          assign(validationMap, {
            [inptKey]: validationRes
          });
        }
      }

    }
    if(isEmpty(validationMap)){
      return true;
    }

    return false;
  },
  _mode: function(){
    return `${this.state.isEdit ? 'edit' : 'consult'}`;
  },
  _className: function formClassName() {
    return `form-horizontal ${this.props.style.className}`;
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
        {this.buttonSave()}
        {this.buttonCancel()}
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
    //console.log('state form', this.state);
    if(this.props.hasForm){
      return (
        <form
          onSubmit={this._handleSubmitForm}
          className={this._className()}
            data-mode={this._mode()}
        >
          <fieldset>
            {this.renderContent()}
          </fieldset>
        </form>
      );
    }
    return this.renderContent();
  }
};

module.exports = builder(formMixin);
