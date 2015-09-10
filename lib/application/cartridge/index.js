'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore;

var cartridgeMixin = {
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /** @inheriteddoc */
    componentWillUnMount: function componentWillUnMount() {
        applicationStore.removeCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /**
     * Read the component state from the connected stores.
     * @return {object} - The new state.
     */
    _getStateFromStore: function _getStateFromStore() {
        return { cartridgeComponent: applicationStore.getCartridgeComponent() || { component: 'div', props: {} } };
    },
    /**
     * Handle the component change cb.
     */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /** @inheriteddoc */
    render: function render() {
        var cartridgeComponent = this.state.cartridgeComponent;
        var Component = cartridgeComponent.component;
        var props = cartridgeComponent.props;

        return React.createElement(
            'div',
            { 'data-focus': 'cartridge' },
            React.createElement(Component, props)
        );
    }
};

module.exports = builder(cartridgeMixin);