'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');

var _require = require('lodash/lang');

var isEmpty = _require.isEmpty;
var isFunction = _require.isFunction;

// Common mixins.
var definitionMixin = require('../mixin/definition');
//let fieldComponentBehaviour = require('../mixin/field-component-behaviour');
var builtInComponents = require('../mixin/built-in-components');
var storeBehaviour = require('../mixin/store-behaviour');
var ownIdentifierBehaviour = require('../mixin/own-identifier');
//Form mixins.
var referenceBehaviour = require('./mixin/reference-behaviour');
var actionBehaviour = require('./mixin/action-behaviour');

/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [ownIdentifierBehaviour, definitionMixin, referenceBehaviour, storeBehaviour, actionBehaviour, builtInComponents],
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
       * Defines if the form has a delete action button.
       * @type {Boolean}
       */
      hasDelete: false,
      /**
       * Does the form call the load action on componentdid mount.
       * @type {Boolean}
       */
      hasLoad: true,
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
  componentWillReceiveProps: function componentWillReceiveProps() {
    var newProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var isEdit = newProps.isEdit;

    if (isEdit !== undefined) {
      this.setState({ isEdit: isEdit });
    }
  },
  /** @inheritdoc */
  callMountedActions: function formCallMountedActions() {
    if (this.props.hasLoad) {
      this._loadData();
    }
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
      if (isFunction(this.refs[inptKey].validate)) {
        var validationRes = this.refs[inptKey].validate();
        if (validationRes !== undefined) {
          var _assign;

          assign(validationMap, (_assign = {}, _assign[inptKey] = validationRes, _assign));
        }
      }
    }
    if (isEmpty(validationMap)) {
      return true;
    }

    return false;
  },
  _mode: function _mode() {
    return '' + (this.state.isEdit ? 'edit' : 'consult');
  },
  _className: function formClassName() {
    return 'form-horizontal ' + this.props.style.className;
  },
  _renderActions: function renderActions() {
    if (this.renderActions) {
      return this.renderActions();
    }
    return this.state.isEdit ? this._renderEditActions() : this._renderConsultActions();
  },
  _renderEditActions: function _renderEditActions() {
    return this.renderEditActions ? this.renderEditActions() : React.createElement(
      'span',
      null,
      this.buttonSave(),
      this.buttonCancel()
    );
  },
  _renderConsultActions: function _renderConsultActions() {
    return this.renderConsultActions ? this.renderConsultActions() : React.createElement(
      'div',
      null,
      this.props.hasEdit && this.buttonEdit(),
      this.props.hasDelete && this.buttonDelete()
    );
  },
  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if (this.validate()) {
      this.action.save.call(this, this._getEntity());
    }
    //return false;
  },
  /** @inheritdoc */
  render: function renderForm() {
    //console.log('state form', this.state);
    if (this.props.hasForm) {
      return React.createElement(
        'form',
        {
          onSubmit: this._handleSubmitForm,
          className: this._className(),
          'data-mode': this._mode()
        },
        React.createElement(
          'fieldset',
          null,
          this.renderContent()
        )
      );
    }
    return this.renderContent();
  }
};

module.exports = builder(formMixin);