import assign from 'object-assign';
import capitalize from 'lodash/string/capitalize';
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';
import defaultsDeep from 'lodash/object/defaultsDeep';
import findIndex from 'lodash/array/findIndex';
import pick from 'lodash/object/pick';

import storeChangeBehaviour from './store-change-behaviour';

/**
 * Behavior to update state according to stores.
 */
const storeMixin = {

    mixins: [storeChangeBehaviour],

    /** @inheritdoc */
    componentWillMount() {
        if (!this.stores) {
            this.stores = [];
        }

        //These listeners are registered before the mounting because they are not correlated to the DOM.
        this._registerListeners();
    },

    /** @inheritdoc */
    componentDidMount() {
        if (this.stores && this.stores.length > 0) {
            const newState = this._getStateFromStores();
            this.setState(newState);
        }
    },

    /** @inheritdoc */
    componentWillUnmount() {
        this._unRegisterListeners();
    },

    /**
     * Get the state informations from the store.
     * @param  {array} filterNodesArg - An object containing nodes key to update.
     * @returns {object} - The js object constructed from store data.
     */
    _getStateFromStores(filterNodesArg) {
        if (this.getStateFromStore) {
            return this.getStateFromStore(filterNodesArg);
        }
        // Build state from store.
        let newState = {};
        this.stores.forEach((storeConf) => {
            storeConf.properties.forEach((property) => {
                newState[property] = storeConf.store[`get${capitalize(property)}`]();
            });
        });
        // If filter is given, we need to filter, even if the array is empty.
        let hasFilter = filterNodesArg !== undefined && filterNodesArg !== null;

        let defaultStateData = {};
        // If there is a custom function, use it. It should return store-level data, with node.
        if (this.getDefaultStoreData) {
            defaultStateData = this.getDefaultStoreData(this.definition, filterNodesArg);
        } else if ((!hasFilter || this.definitionInNode) && this.definition) {
            // If the information about store node is known, or we load all data from store
            // We build the default data
            defaultStateData = this._buildEmptyFromDefinition();
            // If the information about store node is known, we wrapped the object
            if (this.definitionInNode) {
                defaultStateData = { [this.definitionInNode]: defaultStateData }

                // Merge deep consider 'null' as value and therefore wins over defaultStateData below
                if (newState[this.definitionInNode] === null) {
                    newState[this.definitionInNode] = undefined;
                }
            }
        }

        // We handle store-level default data (object with key, for node name)
        if (this.definitionInNode || this.getDefaultStoreData) {
            newState = defaultsDeep({}, newState, defaultStateData);
        }

        // We want to pick only some nodes & reference nodes
        if (hasFilter) {
            // We take all references in addition to given node
            newState = pick(newState, (filterNodesArg || []).concat(this.referenceNames || []));
        }

        const computedState = assign(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());

        // First encountered key wins
        return !hasFilter && !this.definitionInNode && !this.getDefaultStoreData
            ? defaultsDeep({}, computedState, defaultStateData)
            : computedState;
    },

    /**
     * Get the error state informations from the store.
     * @returns {object} - The js error object constructed from the store data.
     */
    _getErrorStateFromStores() {
        if (this.getErrorStateFromStore) {
            return this.getErrorStateFromStore();
        }

        const newState = {};
        this.stores.forEach(storeConf => {
            storeConf.properties.forEach(property => {
                const errorState = storeConf.store[`getError${capitalize(property)}`]();
                for (let prop in errorState) {
                    newState[`${property}.${prop}`] = errorState[prop];
                }
            });
        });

        return newState;
    },

    /**
     * Build object with null values for each key of definition.
     * @returns {object} Empty object.
     */
    _buildEmptyFromDefinition() {
        if (this.buildEmptyFromDefinition) {
            return this.buildEmptyFromDefinition();
        }

        return Object.keys(this.definition)
            .reduce((acc, key) => ((__IS_VERTIGO__ || this.partialObject) && !this.refs[`${this.definitionPath}.${key}`] ? acc : { ...acc, [key]: null }), {});
    },

    /**
     * Get the isLoading state from  all the store.
     * @returns {object} The object with isLoading key set.
     */
    _getLoadingStateFromStores() {
        if (this.getLoadingStateFromStores) {
            return this.getLoadingStateFromStores();
        }

        let isLoading = false;
        this.stores.forEach((storeConf) => {
            if (!isLoading) {
                storeConf.properties.forEach((property) => {
                    if (!isLoading) {
                        const propStatus = storeConf.store.getStatus(property) || {};
                        isLoading = propStatus.isLoading || false;
                    }
                });
            }
        });

        return { isLoading };
    },

    /**
     * Compute the data given from the stores.
     * @param {object} data The data ordered by store.
     * @returns {object} The js object transformed from store data.
     */
    _computeEntityFromStoresData(data) {
        if (this.computeEntityFromStoresData) {
            return this.computeEntityFromStoresData(data);
        }

        const entity = {
            reference: {}
        };
        for (let key in data) {
            if (this.referenceNames && this.referenceNames.includes(key)) {
                entity.reference[key] = data[key];
            } else {
                let d = data[key];
                if (isArray(d) || !isObject(d)) {
                    d = { [key]: d };
                }
                assign(entity, d);
            }
        }

        return entity;
    },

    /**
     * Register all the listeners related to the page.
     */
    _registerListeners() {
        if (this.stores) {
            this.stores.forEach((storeConf) => {
                storeConf.properties.forEach((property) => {
                    this._addRemoveSingleListener('add', storeConf.store, property);
                });
            });
        }
    },

    /**
    * Unregister all the listeners related to the page.
    */
    _unRegisterListeners() {
        if (this.stores) {
            this.stores.forEach((storeConf) => {
                storeConf.properties.forEach((property) => {
                    this._addRemoveSingleListener('remove', storeConf.store, property);
                });
            });
        }
    },

    /**
     * Add or remove on listener.
     * @param {*} action Add or remove operation.
     * @param {*} store  Store to operate on.
     * @param {*} property Node to operate on.
     */
    _addRemoveSingleListener(action, store, property) {
        if (!store || !store.definition || !store.definition[property]) {
            throw new Error(`You ${action} a property : ${property} in your store subscription for ${store.name || store.identifier} which is not in your definition : ${Object.keys(store.definition)}`);
        }
        store[`${action}${capitalize(property)}ChangeListener`](this._onStoreChange);
        store[`${action}${capitalize(property)}ErrorListener`](this._onStoreError);
        store[`${action}${capitalize(property)}StatusListener`](this._onStoreStatus);
    },

    /**
     * Add a listened node.
     * @param {*} store Store to listen to.
     * @param {*} property Node to listen to.
     */
    addStoreSub(store, property) {
        if (!this.stores) {
            this.stores = [];
        }

        const storeIndex = findIndex(this.stores, elt => elt.store === store);
        const existingConf = storeIndex === -1 ? null : this.stores[storeIndex];

        if (existingConf && existingConf.properties.includes(property)) {
            return; // Store/Node tuple already listened.
        }

        this._addRemoveSingleListener('add', store, property);

        if (existingConf) {
            existingConf.properties.push(property);
        } else {
            this.stores.push({
                store,
                properties: [property]
            });
        }
    },

    /**
     * Remove a listened node.
     * @param {*} store Store to unlisten to.
     * @param {*} property Node to unlisten to.
     */
    removeStoreSub(store, property) {
        if (!this.stores) {
            this.stores = [];
        }

        const storeIndex = findIndex(this.stores, elt => elt.store === store);
        if (storeIndex === -1) {
            return;
        }

        const existingConf = this.stores[storeIndex];
        const propertyIndex = existingConf.properties.indexOf(property);
        if (propertyIndex === -1) {
            return;
        }

        this._addRemoveSingleListener('remove', store, property);

        existingConf.properties.splice(propertyIndex, 1);
        if (existingConf.properties.length === 0) {
            this.stores.splice(storeIndex, 1);
        }
    }

};

export default storeMixin;
