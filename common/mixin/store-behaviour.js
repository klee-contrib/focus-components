var capitalize = require('lodash/string/capitalize');
var assign = require('object-assign');
var isArray = require('lodash/lang/isArray');
var keys = require('lodash/object/keys');

var storeMixin = {
  /**
   * Get the state informations from the store.
   * @returns {object} - The js object constructed from store data.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map((storeConf) => {
      storeConf.properties.map((property)=>{
        newState[property] = storeConf.store[`get${capitalize(property)}`]();
      });
    });
    return assign(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());
  },
    /**
     * Get the error state informations from the store.
     * @returns {object} - The js error object constructed from the store data.
     */
  _getErrorStateFromStores: function formGetErrorStateFromStore() {
      if (this.getErrorStateFromStore) {
          return this.getErrorStateFromStore();
      }
      var newState = {};
      this.stores.map((storeConf) => {
          storeConf.properties.map((property)=>{
              newState[property] = storeConf.store[`getError${capitalize(property)}`]();
          });
      });
      return this._computeEntityFromStoresData(newState);
  },
  /**
   * Get the isLoading state from  all the store.
   */
  _getLoadingStateFromStores: function getLoadingStateFromStores(){
    if (this.getLoadingStateFromStores) {
        return this.getLoadingStateFromStores();
    }
    var isLoading = false;
    this.stores.map((storeConf) => {
        if(!isLoading){
          storeConf.properties.map((property)=>{
            if(!isLoading){
              var propStatus = storeConf.store.getStatus(property) || {};
               isLoading = propStatus.isLoading;
            }
          });
        }
    });
    return {isLoading: isLoading};
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   * @returns {object} - The js object transformed from store data.
   */
  _computeEntityFromStoresData: function(data) {
    if(this.computeEntityFromStoresData){
      return this.computeEntityFromStoresData(data);
    }
    var entity = {reference: {}};
    for(var key in data){
      if(this.referenceNames && this.referenceNames.indexOf(key) !== -1){
        entity.reference[key] = data[key];
      }else {
        var d = data[key];
        if(isArray(d)){
          d = {[key] : d};
        }
        assign(entity, d);
      }
    }
    return entity;
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function registerStoreListeners() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          if(!storeConf.store || !storeConf.store.definition || !storeConf.store.definition[property]){
            console.warn(`You add a property : ${property} in your store which is not in your definition : ${keys(storeConf.store.definition)}`);
          }
          storeConf.store[`add${capitalize(property)}ChangeListener`](this._onChange);
          storeConf.store[`add${capitalize(property)}ErrorListener`](this._onError);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function unregisterListener() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          storeConf.store[`remove${capitalize(property)}ChangeListener`](this._onChange);
          storeConf.store[`remove${capitalize(property)}ErrorListener`](this._onError);
        });
      });
    }
  },
  /** @inheritdoc */
  componentWillMount: function storeBehaviourWillMount() {
    //These listeners are registered before the mounting because they are not correlated to the DOM.
    //Build the definitions.
    this._registerListeners();
  },
  /** @inheritdoc */
  componentWillUnmount: function storeBehaviourWillUnmount() {
    this._unRegisterListeners();
  }
};

module.exports = storeMixin;
