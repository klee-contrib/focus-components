// Dependencies

'use strict';

var builder = require('focus').component.builder;

// Stores

var applicationStore = require('focus').application.builtInStore;

// Mixins

var stylableBehaviour = require('../../mixin/stylable');

// Components

var Button = require('../../common/button/action').component;
var Dropdown = require('../../common/select-action').component;

var ContentActions = {
    mixins: [stylableBehaviour],
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        applicationStore.addActionsChangeListener(this._handleComponentChange);
    },
    /** @inheriteddoc */
    componentWillUnMount: function componentWillUnMount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    },
    /**
     * Get state from store
     * @return {Object} actions extracted from the store
     */
    _getStateFromStore: function _getStateFromStore() {
        return {
            actions: applicationStore.getActions() || { primary: [], secondary: [] } };
    },
    /**
     * Component change handler
     */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /** @inheriteddoc */
    render: function render() {
        var actions = this.state.actions;

        return React.createElement(
            'div',
            { className: this._getStyleClassName(), 'data-focus': 'content-actions' },
            actions.primary.map(function (primary) {
                return React.createElement(Button, { handleOnClick: primary.action, icon: primary.icon, label: primary.label, shape: 'fab', style: { className: primary.className }, type: 'button' });
            }),
            React.createElement(Dropdown, { iconProps: { name: 'more_vert' }, operationList: actions.secondary, shape: 'fab' })
        );
    }
};

module.exports = builder(ContentActions);