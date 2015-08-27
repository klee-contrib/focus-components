'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore;

var barMixin = {
    /**
    * Default props
    * @return {object} Default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            style: {}
        };
    },
    /**
    * Get initial state
    * @return {object} Initial state
    */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },
    /**
    * Component will mount
    */
    componentWillMount: function componentWillMount() {
        applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentRightComponentChangeListener(this._handleComponentChange);
    },
    /**
    * Component will unmount
    */
    componentWillUnMount: function componentWillUnMount() {
        applicationStore.removeSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentRightComponentChangeListener(this._handleComponentChange);
    },
    /**
    * Get state from store
    * @return {object} state from store
    */
    _getStateFromStore: function _getStateFromStore() {
        return {
            summaryComponent: applicationStore.getSummaryComponent(),
            barContentLeftComponent: applicationStore.getBarContentLeftComponent(),
            barContentRightComponent: applicationStore.getBarContentRightComponent()
        };
    },
    /**
    * Component change handler
    */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    render: function render() {
        var className = 'bar ' + this.props.style.className;
        var _state = this.state;
        var barContentLeftComponent = _state.barContentLeftComponent;
        var barContentRightComponent = _state.barContentRightComponent;
        var summaryComponent = _state.summaryComponent;

        return React.createElement(
            'div',
            { className: className, 'data-focus': 'bar' },
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-left' },
                barContentLeftComponent && React.createElement(barContentLeftComponent.component, barContentLeftComponent.props)
            ),
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-right' },
                barContentRightComponent && React.createElement(barContentRightComponent.component, barContentRightComponent.props)
            ),
            React.createElement(
                'div',
                { 'data-focus': 'bar-content-middle' },
                summaryComponent && React.createElement(summaryComponent.component, summaryComponent.props)
            )
        );
    }
};

module.exports = builder(barMixin);