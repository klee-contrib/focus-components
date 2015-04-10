var builder = require('focus').component.builder;
var popin = require('../popin').mixin;
var Button = require('../../common/button/action').component;
var type = require('focus').component.types;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {
  mixins: [popin],
  /**
   * Display name.
   */
  displayName: 'confirmation-popin',

  /** @inheritdoc */
  getDefaultProps: function () {
    return {
      btnClose: 'Cancel',
      btnConfirm: 'Ok'
    };
  },

  /** @inheritdoc */
  propTypes: {
    btnClose: type('string'),
    btnConfirm: type('string')
  },

  /**
   * Confirmation action
   */
  _handleConfirm: function openModal() {
    this.closeModal();
    this.handleClikOnOk();
  },
  /**
   * Cancel action
   */
  _handleCancel: function closeModal() {
    this.closeModal();
    this.handleClikOnCancel();
  },
  /**
   * Render the footer content.
   * @returns {XML} - footer content
   */
  renderPopinFooter: function renderPopinFooter(){
    var closeStyle = {
      className: 'confirmation-popin-close'
    };
    var confirmStyle = {
      className: 'confirmation-popin-confirm btn-primary'
    };
    return <div className='btns-confirmation-popin'>
            <Button handleOnClick = {this._handleCancel} label = {this.props.btnClose} style = {closeStyle}/>
            <Button handleOnClick = {this._handleConfirm} label = {this.props.btnConfirm} style = {confirmStyle} />
          </div>;
  }

};

module.exports = builder(popinMixin);
