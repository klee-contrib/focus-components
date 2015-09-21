const builder = require('focus-core').component.builder;
const React = require('react');
const applicationStore = require('focus-core').application.builtInStore;

const cartridgeMixin = {
    /** @inheriteddoc */
    getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /** @inheriteddoc */
    componentWillUnMount() {
        applicationStore.removeCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /**
     * Read the component state from the connected stores.
     * @return {object} - The new state.
     */
    _getStateFromStore() {
        return {cartridgeComponent: applicationStore.getCartridgeComponent() || {component: 'div', props: {}}};
    },
    /**
     * Handle the component change cb.
     */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /** @inheriteddoc */
    render() {
        const {cartridgeComponent} = this.state;
        const {component: Component, props} = cartridgeComponent;
        return (
            <div data-focus='cartridge'>
                <Component {...props}/>
            </div>
        );
    }
};

module.exports = builder(cartridgeMixin);
