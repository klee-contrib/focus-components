// Dependencies

'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;

// Mixins

var i18nMixin = require('../../common/i18n/mixin');

// Components

var Popin = require('../popin').component;
var Button = require('../../common/button/action').component;

var ConfirmationPopin = {
  /**
   * Display name.
   */
  displayName: 'confirmation-popin',
  mixins: [i18nMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      cancelButtonLabel: 'popin.confirmation.cancel',
      confirmButtonLabel: 'popin.confirmation.confirm'
    };
  },

  propTypes: {
    cancelButtonLabel: type('string'),
    confirmButtonLabel: type('string'),
    cancelHandler: type(['function', 'object']),
    confirmHandler: type(['function', 'object'])
  },

  /**
   * Confirmation action handler
   */
  _handleConfirm: function _handleConfirm() {
    this.toggleOpen();
    if (this.props.confirmHandler) {
      this.props.confirmHandler();
    }
  },

  /**
   * Cancel action handler
   */
  _handleCancel: function _handleCancel() {
    this.toggleOpen();
    if (this.props.cancelHandler) {
      this.props.cancelHandler();
    }
  },

  toggleOpen: function toggleOpen() {
    this.refs.popin.toggleOpen();
  },

  render: function render() {
    return React.createElement(
      'div',
      { 'data-focus': 'confirmation-popin' },
      React.createElement(
        Popin,
        { ref: 'popin' },
        this.props.children,
        React.createElement(
          'div',
          { 'data-focus': 'button-stack' },
          React.createElement(Button, { handleOnClick: this._handleCancel, label: this.i18n(this.props.cancelButtonLabel) }),
          React.createElement(Button, { handleOnClick: this._handleConfirm, label: this.i18n(this.props.confirmButtonLabel), option: 'primary' })
        )
      )
    );
  }
};

module.exports = builder(ConfirmationPopin);