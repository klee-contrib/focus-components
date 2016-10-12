import {isArray, isFunction, isObject} from 'lodash/lang';
import {capitalize} from 'lodash/string'
import {keys} from 'lodash/object';
import React, {Component} from 'react';

// - Provide the component
// - Provide the store configuration `[{store: yourStore, properties: ['property1', 'property2']}]`
// - Provide a function to read state from your store
export default function connectToStores(storesConfiguration, getState, siReplaceState) {
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
                this._isMounted = false;
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
                    this.updateState();
                }

                // Component unmount.
                componentWillUnmount() {
                    this._isMounted = false;
                    storesConfiguration.forEach(storeConf => {
                        const {properties} = storeConf;
                        properties.forEach((property) => {
                            const capitalizedProperty = capitalize(property);
                            storeConf.store[`remove${capitalizedProperty}ChangeListener`](this.handleStoresChanged);
                            storeConf.store[`remove${capitalizedProperty}ErrorListener`](this.handleStoresChanged);
                        });
                    });
                }

                componentDidMount() {
                    this._isMounted = true;
                    this.updateState();
                }

                updateState() {
                    if(this._isMounted) {
                        if(siReplaceState) {
                            this.state = getState(this.props);
                        } else {
                            this.setState(getState(this.props));
                        }
                    }
                }

                //Handle the store changes
                handleStoresChanged = () => {
                    this.updateState();
                };

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
