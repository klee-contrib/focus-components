'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var requestStore = require('focus').network.builtInStore;
var assign = require('object-assign');
var ProgressBar = require('../../common/progress-bar').component;
var Icon = require('../../common/icon').component;
var LoadingBarMixin = {
  /** @inheriteddoc */
  getInitialState: function getInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function componentWillMount() {
    requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
    requestStore.addClearRequestsListener(this._handleClearRequests);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount() {
    requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
    requestStore.removeClearRequestsListener(this._handleClearRequests);
  },
  _getStateFromStore: function getCartridgeStateFromStore() {
    return requestStore.getRequests();
  },
  _handleRequestsUpdate: function _handlePushMessage(messageId) {
    this.setState(this._getStateFromStore());
  },
  _handleClearRequests: function _handleClearRequests() {
    this.setState({ requests: {} });
  },
  /** @inheriteddoc */
  render: function renderProgressBar() {
    var completed = +((this.state.total - this.state.pending) / this.state.total) * 100;
    var visible = false;
    if (completed < 100) {
      visible = true;
    }
    //Else empty the loading list?
    return React.createElement(
      'div',
      { 'data-focus': 'loading-bar' },
      visible && React.createElement(ProgressBar, { completed: completed }),
      React.createElement(
        'ul',
        { className: 'fa-ul' },
        React.createElement(
          'li',
          null,
          React.createElement(Icon, { name: 'circle-o-notch', other: 'fa-li fa-spin' }),
          ' pending ',
          this.state.pending
        ),
        React.createElement(
          'li',
          null,
          React.createElement(Icon, { name: 'circle-thin', other: 'fa-li' }),
          ' cancelled ',
          this.state.cancelled
        ),
        React.createElement(
          'li',
          null,
          React.createElement(Icon, { name: 'check', other: 'fa-li' }),
          ' success ',
          this.state.success
        ),
        React.createElement(
          'li',
          null,
          React.createElement(Icon, { name: 'ban', other: 'fa-li' }),
          'error ',
          this.state.error
        ),
        React.createElement(
          'li',
          null,
          React.createElement(Icon, { name: 'plus-square-o', other: 'fa-li' }),
          'total ',
          this.state.total
        )
      )
    );
  }
};

module.exports = builder(LoadingBarMixin);