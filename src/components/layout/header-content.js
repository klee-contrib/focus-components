import React, { Component } from 'react';
import applicationStore from 'focus-core/application/built-in-store';

/**
* HeaderContent component.
*/
class HeaderContent extends Component {

    /** Display name. */
    static displayName = 'HeaderContent';

    /**
     * Constructor.
     * @param {object} props Props.
     */
    constructor(props) {
        super(props);

        this.state = this._getStateFromStore();

        this._handleComponentChange = this._handleComponentChange.bind(this);
    }

    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        applicationStore.removeCartridgeComponentChangeListener(this._handleComponentChange);
    }

    /**
    * Read the component state from the connected stores.
    * @return {object} - The new state.
    */
    _getStateFromStore() {
        return {
            cartridgeComponent: applicationStore.getCartridgeComponent() || { component: 'div', props: {} }
        };
    }

    /**
    * Handle the component change cb.
    */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    }

    /** @inheritdoc */
    render() {
        const { cartridgeComponent: { component: Component, props } } = this.state;

        return (
            <div data-focus='header-content'>
                <Component {...props} />
            </div>
        );
    }
}

export default HeaderContent;
