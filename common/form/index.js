var builder = require('focus').component.builder;
var React = require('react');
var assign = require('object-assign');
var getEntityDefinition = require('focus').definition.entity.builder.getEntityInformations;
var formElementsMixin = require('./formElementsMixin');
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
      isEdit: false
    };
  },
	/**
	 * Build the entity definition givent the path of the definition.
	 */
	_buildDefinition: function(){
		this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
},
  getInitialState: function() {
    return {
      id: this.props.id
    };
  },
  _getStateFromStores: function() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    if (this.stores.length === 1) {
      return this.stores[0].value.get(this.props.id);
    }
    var newState = {};
    this.stores.map((store) => {
      newState[store.name] = store.value.get(this.props.id);
    });
    return newState;
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
  _registerListeners: function() {
    if (this.stores) {
      this.stores.map((storeConf) => {
				storeConf.properties.map((property)=>{
					storeConf.store[`add${storeConf}ChangeListener`]();
				});
      });
    }
  },
  _unRegisterListeners: function() {
		if (this.stores) {
			this.stores.map((storeConf) => {
				storeConf.properties.map((property)=>{
					storeConf.store[`remove${storeConf}ChangeListener`]();
				});
			});
		}
  },
  componentDidMount: function() {
    this._registerListeners();
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  componentWillUnmount: function() {
		//Build the definitions.
		this._buildDefinition();
		//
    this._unRegisterListeners();
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },
  _getId: function() {
    return this.state.id;
  },
  _loadData: function() {
    this.action.load(this._getId());
  },
  _className: function() {
    return "form-horizontal";
  },
  _getEntity: function() {
    return {
      login: "pierr",
      password: "pierre"
    };
  },
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    console.log("submit", this.refs);
    this.validate();
    this.action.save(this._getEntity());
    return false;
  },
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      assign(validationMap, {
        [inptKey]: this.refs[inptKey].validate()
      });
    }
    this.setState({
      error: validationMap
    });
    //console.log(validationMap);
  },
  render: function() {
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
