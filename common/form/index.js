var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var getEntityDefinition = require('focus').definition.entity.builder.getEntityInformations;
var formElementsMixin = require('./formElementsMixin');
var capitalize = require('lodash/string/capitalize');
var isEmpty = require('lodash/lang/isEmpty');
/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [formElementsMixin],
  /**
   * Get default property for the form.
   */
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
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition(){
    if(!this.definitionPath){
      throw new Error('the definition path should be defined to know the domain of your entity property.');
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      id: this.props.id
    };
  },
  /**
   * Get the state informations from the store.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map((storeConf) => {
      storeConf.properties.map((property)=>{
        newState[property] = storeConf.store[`get${capitalize(property)}`]() ;
      });
    });
    return this._computeEntityFromStoresData(newState);
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(this._getStateFromStores());
  },
  callMountedActions: function() {
    this._loadData();
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          storeConf.store[`add${capitalize(property)}ChangeListener`](this._onChange);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          storeConf.store[`remove${capitalize(property)}ChangeListener`]();
        });
      });
    }
  },
  /** @inheritdoc */
  componentWillMount : function formWillMount(){
    this._buildDefinition();
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
   * Get the entity identifier for the form loading.
   */
  _getId: function formGetId() {
    if(this.getEntity){
      return this.getEntity();
    }
    return this.state.id;
  },
  /**
   * Get the constructed entity from the state.
   */
  _getEntity: function formGetEntity(){
    if(this.getEntity){
      return this.getEntity();
    }
    return this.state;
  },
  _loadData: function formLoadData() {
    this.action.load(this._getId());
  },
  _className: function formClassName() {
    return `form-horizontal ${this.props.style.className}`;
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   */
  _computeEntityFromStoresData: function(data) {
    if(this.computeEntityFromStoresData){
      return this.computeEntityFromStoresData(data);
    }
    var entity = {};
    for(var key in data){
      assign(entity, data[key]);
    }
    return entity;
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
  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @return {undefined}
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      assign(validationMap, {
        [inptKey]: this.refs[inptKey].validate()
      });
    }
    if(isEmpty(validationMap)){
      return true;
    }

    return false;
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
