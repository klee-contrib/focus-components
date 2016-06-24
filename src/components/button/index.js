import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from '../../behaviours/material';
import Translation from '../../behaviours/translation';
import ComponentBaseBehaviour from '../../behaviours/component-base';

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

const propTypes = {
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
}

const defaultProps = {
    type: 'submit',
    shape: 'raised',
    label: '',
    icon: null,
    id: '',
    hasRipple: false,
    isJs: false,
    iconLibrary: 'material'
}

@MDBehaviour('materialButton', 'MaterialButton')
@Translation
class Button extends Component {
    Bonjour vous !
}

Button.displayName = 'Button'
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
