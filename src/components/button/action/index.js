//https://github.com/google/material-design-lite/blob/master/src/mdlComponentHandler.js#L333
import React, {Component, PropTypes} from 'react';
import builder from 'focus-core/component/builder';
import {translate} from 'focus-core/translation';
const stylableMixin = require('../../../mixin/stylable');
const materialBehaviour = require('../../../common/mixin/mdl-behaviour');

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

/**
* Handle click event.
* @return {Object} - Action call.
*/
const _handleOnClick = (handleOnClick) => {
    if (handleOnClick) {
        console.log('Me', handleOnClick);
        return handleOnClick.apply(this, arguments);
    }
};

/**
* Date de composant.
* @return {string} Classe.
*/
const _getComponentClassName = (shape, color, hasRipple, isJs) => {
    console.log('_getComponentClassName is called');
    let SHAPE_CLASS;
    switch (shape) {
        case 'raised':
            SHAPE_CLASS = `${BUTTON_PRFX}raised`;
            break;
        case 'fab':
            SHAPE_CLASS = `${BUTTON_PRFX}fab`;
            break;
        case 'icon':
            SHAPE_CLASS = `${BUTTON_PRFX}icon`;
            break;
        case 'mini-fab':
            SHAPE_CLASS = `${BUTTON_PRFX}mini-fab ${BUTTON_PRFX}fab`;
            break;
        default:
            SHAPE_CLASS = null;
            break;
    }
    const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
    const JS_CLASS = isJs ? BTN_JS : '';
    const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
    return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
};

/**
* Render the pressed button.
* @return {Component} - Component button.
*/
const renderPressedButton = () => {
    return (<button>Loading...</button>);
};

/**
* Render an icon.
* @return {Component} - Composant icone.
*/
const _renderIcon = (icon, iconLibrary) => {
    switch (iconLibrary) {
        case 'material':
            return <i className='material-icons'>{icon}</i>;
        case 'font-awesome':
            const faCss = `fa fa-${icon}`;
            return <i className={faCss}></i>;
        case 'font-custom':
            return <span className={`icon-${icon}`}></span>;
        default:
            return null;
    }
};

/**
* Render the label.
* @return {Component} - Tle button label.
*/
const _renderLabel = (label, shape) => {
    if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
        return translate(label);
    }
    return null;
};

const ButtonAction = ({className, icon, id, type, label, style, handleOnClick, shape, color, hasRipple, isJs, iconLibrary, ...otherProps}) => {
    return (
        <button alt={translate(label)} className={`${className} ${_getComponentClassName(shape, color, hasRipple, isJs)}`} data-focus='button-action' id={id} onClick={() => {_handleOnClick(handleOnClick)}} title={translate(label)} type={type} {...otherProps}>
            {icon && _renderIcon(icon, iconLibrary)}
            {_renderLabel(label, shape)}
        </button>
    );
};

ButtonAction.displayName = 'ButtonAction';

ButtonAction.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    handleOnClick: PropTypes.func,
    type: PropTypes.oneOf(['submit', 'button']),
    shape: PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    color: PropTypes.oneOf([undefined,'colored', 'primary', 'accent']),
    hasRipple: PropTypes.bool,
    isJs: PropTypes.bool,
    icon: PropTypes.string,
    iconLibrary: PropTypes.oneOf(['material', 'font-awesome', 'font-custom'])
};

ButtonAction.defaultProps = {
    type: 'submit',
    shape: 'raised',
    label: '',
    icon: null,
    id: '',
    hasRipple: false,
    isJs: false,
    iconLibrary: 'material'
};

ButtonAction.mixins = [stylableMixin, materialBehaviour];

export default ButtonAction;
