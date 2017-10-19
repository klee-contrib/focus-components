import React, { Component } from 'react';

import isFunction from 'lodash/lang/isFunction';
import isArray from 'lodash/lang/isArray';
import capitalize from 'lodash/string/capitalize'

/**
 * Behavior for store connection.
 * @param {array} storesConfiguration Provide the store configuration `[{store: yourStore, properties: ['property1', 'property2']}]`.
 * @param {func} getState Provide a function to read state from your store.
 * @returns {func} Wrapper function.
 */
export default function connectToStores(storesConfiguration, getState) {
    // Validate the stores object
    if (!isArray(storesConfiguration)) {
        throw new Error('connectToStores: you need to provide an array of store config.');
    }

    // Validate getState function
    if (!isFunction(getState)) {
        throw new Error('connectToStores: you need to provide function to read state from store.');
    }

    /**
     * Wrapping store behavior.
     * @param {JSXElement} DecoratedComponent Component to be wrapped.
     * @returns {JSXElement} Wrapped component.
     */
    return function connectComponent(DecoratedComponent) {

        // Save the display name for later
        const displayName = DecoratedComponent.displayName || 'Component';

        /**
         * The goal of this class is to connect a component to a list of stores with properties.
         */
        class StoreConnector extends Component {

            /** Display name. */
            static displayName = `${displayName}Connected`;

            /**
             * Constructor.
             * @param {object} props Props.
             */
            constructor(props) {
                super(props);
                this._isMounted = false;
                this.handleStoresChanged = this.handleStoresChanged.bind(this);
            }

            /** @inheritdoc */
            componentWillMount() {
                // When the component will mount, we listen to all stores changes.
                // When a change occurs the state is read again from the state.
                this.handleStoreListenerChange('add');
            }

            /** @inheritdoc */
            componentDidMount() {
                this._isMounted = true;
            }

            /** @inheritdoc */
            componentWillUnmount() {
                this._isMounted = false;
                this.handleStoreListenerChange('remove');
            }

            /**
             * Handle adding or removing listeners.
             * @param {string} type Add or remove listeners.
             */
            handleStoreListenerChange(type) {
                storesConfiguration.forEach(({ properties, store: storeArg }) => {
                    const store = typeof storeArg === 'function' ? storeArg() : storeArg;
                    properties.forEach(property => {
                        if (!store || !store.definition || !store.definition[property]) {
                            console.warn(`
                                StoreConnector ${displayName}:
                                    You add a property : ${property} in your store configuration which is not in your definition : ${Object.keys(store.definition)}
                            `);
                        }
                        const capitalizedProperty = capitalize(property);
                        store[`${type}${capitalizedProperty}ChangeListener`](this.handleStoresChanged);
                        store[`${type}${capitalizedProperty}ErrorListener`](this.handleStoresChanged);
                    });
                });
            }

            /**
             * Handle the store changes
             */
            handleStoresChanged() {
                if (this._isMounted) {
                    this.forceUpdate();
                }
            }

            /**
             * Get the decorated component.
             * @returns {JSXElement} Component.
             */
            getDecoratedComponent() {
                return this.refs.decoratedComponent;
            }

            /**
             * Get the isLoading state from  all the store.
             * @returns {object} The object with isLoading key set.
             */
            _getLoadingStateFromStores() {
                let isLoading = false;

                storesConfiguration.forEach(storeConf => {
                    const { properties, store: storeArg } = storeConf;
                    const store = typeof storeArg === 'function' ? storeArg() : storeArg;
                    if (!isLoading) {
                        properties.forEach(property => {
                            if (!isLoading) {
                                const propStatus = store.getStatus(property) || {};
                                isLoading = propStatus.isLoading || false;
                            }
                        });
                    }
                });

                return isLoading;
            }

            /** @inheritdoc */
            render() {
                return (
                    <DecoratedComponent
                        isLoading={this._getLoadingStateFromStores()}
                        {...this.props}
                        {...getState(this.props)}
                        ref='decoratedComponent'
                    />
                );
            }
        }

        return StoreConnector;
    };
}

// Add a function to connect a store to a component .
// All the store properties values will be provided to the component as props.
// This could be use as an ES7 annotation or as a function.

// ### ES6 version
// ```jsx
// store
// const newStore = new CoreStore({definition: {name: 'name', email: 'email'}});
//Component
// const Component = props => <div>{JSON.stringify(props)}</div>;
// create a connector function
// const connector = storeConnectBehaviour(
//     [{store: newStore, properties: ['name', 'email']}],
//     (props) => {return newStore.getValue()}
// );
// Component connected to the store
// const ConnectedComponent = connector(Component);
// ```

// ### ES7 version
// ```jsx
//    Class version
// @connect( [{store: newStore, properties: ['name', 'email']}],(props) => newStore.getValue())
// class YourComponent extends Component{
//     render(){
//          return  <div>{JSON.stringify(props)}</div>;
//     }
// }
// ```
