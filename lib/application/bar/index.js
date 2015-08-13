'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();

var barMixin = {
  getDefaultProps: function getCartridgeDefaultProps() {
    return {
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
    applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount() {
    applicationStore.removeSummaryComponentChangeListener(this._handleComponentChange);
    applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore() {
    return {
      summaryComponent: applicationStore.getSummaryComponent() || { component: 'div', props: {} },
      barContentLeftComponent: applicationStore.getBarContentLeftComponent() || { component: 'div', props: {} }
    };
  },
  _handleComponentChange: function _handleComponentChangeBarSummary() {
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = 'bar ' + this.props.style.className;
    return React.createElement(
      'div',
      { className: className, 'data-focus': 'bar' },
      React.createElement(
        'div',
        { 'data-focus': 'bar-content-left' },
        React.createElement(this.state.barContentLeftComponent.component, this.state.barContentLeftComponent.props),
        ' '
      ),
      React.createElement(
        'div',
        { 'data-focus': 'bar-content-right' },
        React.createElement('i', { className: 'fa fa-bell-o fa-2x' })
      ),
      React.createElement(
        'div',
        { 'data-focus': 'bar-content-middle' },
        React.createElement(this.state.summaryComponent.component, this.state.summaryComponent.props)
      )
    );
  }
};

module.exports = builder(barMixin);