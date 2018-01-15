import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from '../../behaviours/material';
import Translation from '../../behaviours/translation';
import filterProps from '../../utils/filter-html-attributes';

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

@MDBehaviour('materialButton', 'MaterialButton')
@Translation
/**
 * Button component.
 */
class Button extends Component {

    /** DisplayName. */
    static displayName = 'Button';

    /** PropTypes. */
    static propTypes = {
        className: PropTypes.string,
        color: PropTypes.oneOf([undefined, 'colored', 'primary', 'accent']),
        disabled: PropTypes.bool,
        formNoValidate: PropTypes.bool,
        handleOnClick: PropTypes.func, //to remove in V2
        hasRipple: PropTypes.bool,
        id: PropTypes.string,
        icon: PropTypes.string,
        iconLibrary: PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
        isJs: PropTypes.bool,
        isLoading: PropTypes.bool,
        label: PropTypes.string,
        onClick: PropTypes.func,
        processLabel: PropTypes.string,
        shape: PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
        type: PropTypes.oneOf(['submit', 'button'])
    };

    /** DefaultProps. */
    static defaultProps = {
        className: '',
        color: undefined,
        disabled: false,
        formNoValidate: false,
        handleOnClick: undefined,
        hasRipple: false,
        icon: null,
        iconLibrary: 'material',
        id: undefined,
        isJs: false,
        isLoading: false,
        label: '',
        onClick: undefined,
        processLabel: '',
        shape: 'raised',
        type: 'submit'
    };

    /** @inheritdoc */
    componentDidMount() {
        const { hasRipple } = this.props;
        const refNode = ReactDOM.findDOMNode(this.refs.materialButton);
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
        }
    }

    /** @inheritdoc */
    componentDidUpdate() {
        const spinnerNode = ReactDOM.findDOMNode(this.refs['double-action-button-spinner']);
        if (spinnerNode) {
            componentHandler.upgradeElement(spinnerNode, 'MaterialSpinner');
        }
    }

    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName() {
        const { shape, color, hasRipple, isJs } = this.props;

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
        return (<button>{'Loading...'}</button>);
    }

    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon() {
        const { icon, iconLibrary } = this.props;
        switch (iconLibrary) {
            case 'material':
                return (<i className='material-icons'>{icon}</i>);
            case 'font-awesome':
                return (<i className={`fa fa-${icon}`} />);
            case 'font-custom':
                return (<span className={`icon-${icon}`} />);
            default:
                return null;
        }
    }

    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel() {
        const { isLoading, label, processLabel, shape } = this.props;

        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape && (!isLoading || !processLabel)) {
            return (
                <span data-focus='button-label'>{this.i18n(label)}</span>
            );
        } else if (processLabel && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape && isLoading) {
            return (
                <span data-focus='button-label'>{this.i18n(processLabel)}</span>
            );
        }
        return null;
    }

    /**
     * Wrapper around on click, to prevent click action is spinner is showed.
     * 
     * @param {any} event the html event
     * @param {any} onClick the onclick function to call
     * 
     * @memberOf Button
     */
    _wrappedOnClick(event, onClick) {
        if (this.props.isLoading) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onClick(event);
        }
    }

    /** @inheritdoc */
    render() {
        // attribute doc : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        // be careful the way you declare your attribute names : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        const { className, disabled, formNoValidate, handleOnClick, icon, id, onClick, type, label, style, isLoading, ...rest } = this.props;
        const onClickFunc = handleOnClick ? handleOnClick : onClick;
        const otherInputProps = filterProps({ disabled, formNoValidate, style, type, ...rest }); //on click for legacy. Remove handleOnClick in v2

        if (onClickFunc) {
            otherInputProps.onClick = event => this._wrappedOnClick(event, onClickFunc);
        }
        const renderedClassName = `${className} ${this._getComponentClassName()}`.trim();

        return (
            <button
                alt={this.i18n(label)}
                className={renderedClassName}
                data-focus='button-action'
                data-saving={isLoading}
                disabled={isLoading}
                id={id}
                ref='materialButton'
                title={this.i18n(label)}
                {...otherInputProps}
            >
                {icon && this._renderIcon()}
                {this._renderLabel()}
                {isLoading && (
                    <div
                        className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'
                        data-focus='double-action-button-spinner'
                        ref='double-action-button-spinner'
                    />
                )}
            </button>
        );
    }
}

export default Button;                   