import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import builder from 'focus-core/component/builder';
import {translate} from 'focus-core/translation';
import MDBehaviour from '../../../behaviours/material';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';
const materialBehaviour = require('../../../common/mixin/mdl-behaviour');

@ComponentBaseBehaviour
//@MDBehaviour('materialButton')
class ButtonAction extends Component {

    static defaultProps = {
        type: 'submit',
        shape: 'raised',
        label: '',
        icon: null,
        id: '',
        hasRipple: false,
        isJs: false,
        iconLibrary: 'material'
    };

    static propTypes = {
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

    /**
    * Called when component is mounted.
    */
    componentDidMount = () => {
        const {hasRipple} = this.props;
        const refNode = ReactDOM.findDOMNode(this.refs['materialButton']);
        componentHandler.upgradeElement(refNode, 'MaterialButton');
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
        }
        else {
            componentHandler.upgradeElement(refNode, 'MaterialButton');
        }
    };

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount = () => {
        if (ReactDOM.findDOMNode(this.refs.materialButton)) {
            console.log('Material did unmount');
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this.refs.materialButton));
        }
    };

    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick = () => {
        const {handleOnClick} = this.props;
        if (handleOnClick) {
            return handleOnClick.apply(this, arguments);
        }
    };

    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName = () => {
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
    renderPressedButton = () => {
        return (<button>Loading...</button>);
    };

    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon = () => {
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
    _renderLabel = () => {
        const {label, shape} = this.props;
        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
            return translate(label);
        }
        return null;
    };
    /** inheritedDoc */
    render =() => {
        const {className, icon, id, type, label, style, ...otherProps} = this.props;
        return (
            <button alt={translate(label)} className={`${className} ${this._getComponentClassName()}`} data-focus='button-action' id={id} onClick={this.handleOnClick} title={translate(label)} type={type} {...otherProps} ref='materialButton'>
                {icon && this._renderIcon()}
                {this._renderLabel()}
            </button>
        );
    }
}

export default ButtonAction;
