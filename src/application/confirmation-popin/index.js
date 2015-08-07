// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;

// Mixins

let i18nMixin = require('../../common/i18n/mixin');

// Components

let Popin = require('../popin').component;
let Button = require('../../common/button/action').component;

let ConfirmationPopin = {
  /**
   * Display name.
   */
  displayName: 'confirmation-popin',
  mixins: [i18nMixin],
  getDefaultProps() {
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
  _handleConfirm() {
    this.toggleOpen();
    if (this.props.confirmHandler) {
      this.props.confirmHandler();
    }
  },

  /**
   * Cancel action handler
   */
  _handleCancel() {
    this.toggleOpen();
    if (this.props.cancelHandler) {
      this.props.cancelHandler();
    }
  },

  toggleOpen() {
    this.refs.popin.toggleOpen();
  },

  render() {
    return (
      <div data-focus='confirmation-popin'>
        <Popin  ref='popin'>
          {this.props.children}
          <div data-focus='button-stack'>
            <Button handleOnClick={this._handleCancel} label={this.i18n(this.props.cancelButtonLabel)}/>
            <Button handleOnClick={this._handleConfirm} label={this.i18n(this.props.confirmButtonLabel)} option='primary'/>
          </div>
        </Popin>
      </div>
    );
  }
};

module.exports = builder(ConfirmationPopin);
