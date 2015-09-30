const React = require('react');
const {builder, types} = require('focus-core').component;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
//const Icon = require('../../icon').component;
const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

const oneOf = React.PropTypes.oneOf;
const materialBehaviour = require('../../mixin/mdl-behaviour');
/**
* Mixin button.
* @type {Object}
*/
const buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin, materialBehaviour],
    displayName: 'Button',
    /** inheritedDoc */
    getDefaultProps() {
        return {
            type: 'submit',
            shape: 'raised',
            label: '',
            icon: '',
            id: '',
            hasRipple: false,
            isJs: false,
            iconLibrary: 'material'
        };
    },
    propTypes: {
        id: types('string'),
        label: types('string'),
        handleOnClick: types('function'),
        type: oneOf(['submit', 'button']),
        shape: oneOf([undefined, 'raised', 'fab', 'mini', 'icon', 'mini-fab']),
        color: oneOf([undefined, 'colored', 'primary', 'accent']),
        hasRipple: types('bool'),
        isJs: types('bool'),
        icon: types('string'),
        iconLibrary: oneOf(['material', 'font-awesome', 'focus'])
    },
    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick() {
        const {handleOnClick} = this.props;
        if (handleOnClick) {
            return handleOnClick.apply(this, arguments);
        }
    },
    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _className() {
        const {shape, color, hasRipple, isJs} = this.props;
        const SHAPE_CLASS = shape ? `${BUTTON_PRFX}${shape}` : '';
        const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
        const JS_CLASS = isJs ? BTN_JS : '';
        const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
    },
    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton () {
        return (<button>Loading...</button>);
    },
    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon() {
        const {icon, iconLibrary} = this.props;
        switch (iconLibrary) {
            case 'material':
                return <i className='material-icons'>{icon}</i>;
            case 'font-awesome':
                const faCss = `fa fa-${icon}`;
                return <i className={faCss}></i>;
            default:
                return null;
        }
    },
    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel () {
        const {label, shape} = this.props;
        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
            return this.i18n(label);
        }
        return null;
    },
    /** inheritedDoc */
    render() {
        const {id, type, label, style, ...otherProps} = this.props;
        return (
            <button alt={this.i18n(label)} className={this._className()} data-focus="button-action" id={id} onClick={this.handleOnClick} style={style} title={this.i18n(label)} type={type} {...otherProps}>
                {this._renderIcon()}
                {this._renderLabel()}
            </button>
        );
    }
}
;

module.exports = builder(buttonMixin);
