var React = require('react');
var builder = require('focus').component.builder;
var Img = require('../../img').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

/**
 * Mixin button.
 * @type {Object}
 */
var buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    getDefaultProps: function getInputDefaultProps() {
      return {
        type: 'submit',
        action: undefined,
        isPressed: false,
        label: undefined,
        imgSrc: undefined
      };
    },
    /**
     * Clickhandler on the button.
     */
    handleOnClick: function handleButtonOnclick() {
      if (this.props.handleOnClick) {
        return this.props.handleOnClick.apply(this, arguments);
      }
      if (!this.props.action || !this.action[this.props.action]) {
         console.warn('Your button action is not implemented');
        return;
      }
      return this.action[this.props.action].apply(this, arguments);
    },
    /** inheritedDoc */
    getInitialState: function getActionButtonInitialState() {
      return {
        isPressed: this.props.isPressed
      };
    },
    /**
     * ClassName of the button.
     */
    _className: function buttonClassName () {
      return `btn btn-raised ${this._getStyleClassName()}`;
    },
    /**
    * Render the pressed state of the button.
    */
    renderPressedButton: function () {
      return ( <button>Loading...</button>);
    },
    /** inheritedDoc */
    render: function renderInput() {
        if (this.state.isPressed) {
            return this.renderPressedButton();
        }
        if(this.props.imgSrc) {
            return <Img src={this.props.imgSrc} onClick={this.handleOnClick} />;
        }
        return ( <button href="javascript:void(0)" onClick={this.handleOnClick} type={this.props.type} className={this._className()} >{this.i18n(this.props.label)}</button>);
    }
};

module.exports = builder(buttonMixin);
