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

    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        const {hasRipple} = this.props;
        const refNode = ReactDOM.findDOMNode(this.refs['materialButton']);
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
        }
    }

    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick(...args) {
        const {handleOnClick} = this.props;
        if (handleOnClick) {
            return handleOnClick.apply(this, args);
        }
    }

    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName() {
        const {shape, color, hasRipple, isJs} = this.props;
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
            case null:
            SHAPE_CLASS = '';
            break;
            default:
            SHAPE_CLASS = null;
            break;
        }
        const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
        const JS_CLASS = isJs ? BTN_JS : '';
        const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
    }

    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton() {
        return (<button>Loading...</button>);
    }

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
    _renderLabel() {
        const {label, shape} = this.props;
        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
            return this.i18n(label);
        }
        return null;
    };

    /** inheritedDoc */
    render() {
        const {className, handleOnClick, hasRipple, icon, iconLibrary, id, isJs, label, option, route, style, type, ...otherProps} = this.props;
        let renderedClassName;
        if(className) {
            renderedClassName = className + ' ' + ::this._getComponentClassName();
        }
        else {
            renderedClassName = ::this._getComponentClassName();
        }
        return (
            <button alt={this.i18n(label)} className={renderedClassName.trim()} data-focus='button-action' id={id} onClick={(...args) => this.handleOnClick(...args)} title={this.i18n(label)} type={type} {...otherProps} ref='materialButton'>
                {icon && ::this._renderIcon()}
                {::this._renderLabel()}
            </button>
        );
    }
}

Button.displayName = 'Button'
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
