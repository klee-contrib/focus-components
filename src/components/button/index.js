import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from '../../behaviours/material';
import Translation from '../../behaviours/translation';
import ComponentBaseBehaviour from '../../behaviours/component-base';

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

class Button extends Component {

    static propTypes = {
        iframeUrl: PropTypes.string.isRequired;
        width: PropTypes.number.isRequired;
        height: PropTypes.number.isRequired;
        title: PropTypes.string.isRequired;
        requestClose: PropTypes.func.isRequired;
    };

    render() {
        return (
            <div/>
        );
    }
}

Button.displayName = 'Button'

export default Button;
