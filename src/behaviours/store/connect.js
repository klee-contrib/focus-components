import {isArray, isFunction, isObject} from 'lodash/lang';
import {capitalize} from 'lodash/string'
import {keys} from 'lodash/object';
import React, {Component} from 'react';

export default function connectToStores(storesConfiguration, getState) {
    // Validate the stores object
    if(!isArray(storesConfiguration)) {
        throw new Error('connectToStores: you need to provide an array of store config.');
    }

    // Validate .
    if(!isFunction(getState)) {
        throw new Error('connectToStores: you need to provide function to read state from store.');
    }
    // Return a wrapper function around the component
    return function connectComponent(DecoratedComponent) {

        // Save the display name for later
        const displayName = DecoratedComponent.displayName || 'Component';

        // The goal of this class is to connect a component to a list of stores with properties.
        class StoreConnector extends Component {

            constructor(props) {
                super(props);
                //Build the initial state from props.
                this.state = getState(props);
            }

            // When the component will mount, we listen to all stores changes.
            // When a change occurs the state is read again from the state.
            componentWillMount() {
                storesConfiguration.forEach(storeConf => {
                    const {properties, store} = storeConf;
                    properties.forEach((property) => {
                        if(!store || !store.definition || !store.definition[property]) {
                            console.warn(`
                                StoreConnector ${displayName}:
                                    You add a property : ${property} in your store configuration which is not in your definition : ${keys(store.definition)}
                            `);
                        }
                        const capitalizedProperty = capitalize(property);
                        storeConf.store[`add${capitalizedProperty}ChangeListener`](this.handleStoresChanged);
                        storeConf.store[`add${capitalizedProperty}ErrorListener`](this.handleStoresChanged);
                    });
                });
            }

            // When a component will receive a new props.
            componentWillReceiveProps(nextProps) {
                //if (!shallowEqual(nextProps, this.props)) {
                this.setState(getState(nextProps));
                //}
            }

            // Component unmount.
            componentWillUnmount() {
                storesConfiguration.forEach(storeConf => {
                    const {properties, store} = storeConf;
                    properties.forEach((property) => {
                        const capitalizedProperty = capitalize(property);
                        storeConf.store[`remove${capitalizedProperty}ChangeListener`](this.handleStoresChanged);
                        storeConf.store[`remove${capitalizedProperty}ErrorListener`](this.handleStoresChanged);
                    });
                });
            }

            //Handle the store changes
            handleStoresChanged = () => {
                this.setState(getState(this.props));
            }

            // Render the component with only props, some from the real props some from the state
            render() {
                const {props, state} = this;
                return (
                    <DecoratedComponent
                        {...props}
                        {...state}
                    />
                );
            }
        }
        StoreConnector.displayName = `${displayName}Connected`;
        return StoreConnector;
    };
}
