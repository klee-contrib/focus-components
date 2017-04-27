import assign from 'object-assign';
import {isObject, isArray, keys, capitalize, defaultsDeep} from 'lodash';
import storeChangeBehaviour from './store-change-behaviour';

const storeMixin = {
    mixins: [storeChangeBehaviour],
  /**
   * Get the state informations from the store.
   * @returns {object} - The js object constructed from store data.
   */
    _getStateFromStores: function formGetStateFromStore() {
        if (this.getStateFromStore) {
            return this.getStateFromStore();
        }
        let newState = {};
        this.stores.map((storeConf) => {
            storeConf.properties.map((property) => {
                newState[property] = storeConf.store[`get${capitalize(property)}`]();
            });
        });
        let defaultData = {};
        if (this.props.useDefaultStoreData && (this.definition || this.getDefaultStoreData)) {
            if (this.getDefaultStoreData) {
                defaultData = this.getDefaultActionData(this.definition);
            } else {
                defaultData = keys(this.definition).reduce((acc, key) => {
                    acc[key] = null;
                    return acc;
                }, {});
            }
        }
        const computedState = assign(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());
        return defaultsDeep({}, computedState, defaultData);
    },
    /**
     * Get the error state informations from the store.
     * @returns {object} - The js error object constructed from the store data.
     */
    _getErrorStateFromStores: function formGetErrorStateFromStore() {
        if (this.getErrorStateFromStore) {
            return this.getErrorStateFromStore();
        }
        let newState = {};
        this.stores.map( storeConf => {
            storeConf.properties.map( property => {
                let errorState = storeConf.store[`getError${capitalize(property)}`]();
                for (let prop in errorState) {
                    newState[`${property}.${prop}`] = errorState[prop];
                }
            });
        });
        return newState;
    },
  /**
   * Get the isLoading state from  all the store.
   */
    _getLoadingStateFromStores: function getLoadingStateFromStores() {
        if (this.getLoadingStateFromStores) {
            return this.getLoadingStateFromStores();
        }
        let isLoading = false;
        this.stores.forEach((storeConf) => {
            if (!isLoading) {
                storeConf.properties.forEach((property) => {
                    if (!isLoading) {
                        let propStatus = storeConf.store.getStatus(property) || {};
                        isLoading = propStatus.isLoading;
                    }
                });
            }
        });
    //console.info('Processing state', this.stores, 'loading', isLoading);
        return {isLoading: isLoading};
    },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   * @returns {object} - The js object transformed from store data.
   */
    _computeEntityFromStoresData: function _computeEntityFromStoresData(data) {
        if (this.computeEntityFromStoresData) {
            return this.computeEntityFromStoresData(data);
        }
        let entity = {reference: {}};
        for (let key in data) {
            if (this.referenceNames && this.referenceNames.indexOf(key) !== -1 ) {
                entity.reference[key] = data[key];
            } else {
                let d = data[key];
                if (isArray(d) || !isObject(d)) {
                    d = {[key]: d};
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
                storeConf.properties.map((property) => {
                    if (!storeConf.store || !storeConf.store.definition || !storeConf.store.definition[property]) {
                        console.warn(`You add a property : ${property} in your store which is not in your definition : ${keys(storeConf.store.definition)}`);
                    }
                    storeConf.store[`add${capitalize(property)}ChangeListener`](this._onChange);
                    storeConf.store[`add${capitalize(property)}ErrorListener`](this._onError);
                    storeConf.store[`add${capitalize(property)}StatusListener`](this._onStatus);
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
                storeConf.properties.map((property) => {
                    storeConf.store[`remove${capitalize(property)}ChangeListener`](this._onChange);
                    storeConf.store[`remove${capitalize(property)}ErrorListener`](this._onError);
                    storeConf.store[`remove${capitalize(property)}StatusListener`](this._onStatus);
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
