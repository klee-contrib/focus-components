var React = require('react');
var builder = require('focus').component.builder;
var Img = require('../../img').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var Icon = require('../../icon').component;

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
                shape: 'raised', //other values : fab, flat, link, ghost
                option: 'default', //other values : primary (see other from bootsrap) http://getbootstrap.com/css/#buttons-options
                action: undefined,
                isPressed: false,
                label: undefined,
                icon: undefined,
                imgSrc: undefined,
                iconPrefix: 'fa fa-' //todo to remove
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
        _className: function buttonClassName() {
            return `btn btn-${this.props.shape} btn-${this.props.option} ${this._getStyleClassName()}`;
        },
        /**
         * Render the pressed state of the button.
         */
        renderPressedButton: function () {
            return (<button>Loading...</button>);
        },
        _renderIcon: function renderIcon() {
            if (this.props.icon) {
                return <Icon name={this.props.icon} prefix={this.props.iconPrefix} />
            }
            return '';
        },
        _renderLabel: function renderLabel() {
            if (this.props.label && this.props.shape !== 'fab') {
                return this.i18n(this.props.label);
            }
            return '';
        },
        /** inheritedDoc */
        render: function renderInput() {
            if (this.state.isPressed) {
                return this.renderPressedButton();
            }
            //todo to remove -------------------------------------------------------
            if (this.props.imgSrc) {
                return <Img src={this.props.imgSrc} onClick={this.handleOnClick} />;
            }
            //END todo to remove-------------------------------------------------------

            return (
                <button href="javascript:void(0)" onClick={this.handleOnClick} type={this.props.type} alt={this.props.label} title={this.props.label} className={this._className()}>
                    {this._renderIcon()}
                    {this._renderLabel()}
                </button>
            );
        }
    }
    ;

module.exports = builder(buttonMixin);
