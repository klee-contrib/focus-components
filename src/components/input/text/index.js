//dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {identity} from 'lodash/utility';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';
const MODE = {isEdit: true};
const propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeHolder: PropTypes.string,
    unformatter: PropTypes.func,
    formatter: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const defaultProps = {
    disabled: false,
    formatter: identity,
    unformatter: identity,
    type: 'text'
};

/**
 * Component standing for an HTML input.
 */
@MDBehaviour('inputText')
@ComponentBaseBehaviour
class InputText extends Component {

    /**
     * Get the dom value of the component.
     * @return {object} - The unformated dom value.
     */
    getValue = () => {
        const {unformatter} = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);
        return unformatter(domEl.value, MODE);
    }
    /**
     * Handle the change on the input text, it only propagate the value.
     * @param  {object} evt - The react DOM event.
     * @return {object} - The function onChannge from the props, called.
     */
    _handleInputChange = (evt) =>{
        const {unformatter, onChange} = this.props;
        const {value} = evt.target;
        return onChange(unformatter(value, MODE));
    }
    /**
     * @inheritdoc
     * @override
    */
    render() {
        const {error, name, placeholder, style, value: rawValue, formatter, ...otherProps} = this.props;
        const value = formatter(rawValue, MODE);
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const inputProps = {...otherProps, value, id: name, onChange: this._handleInputChange, pattern};
        const cssClass = `mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`;
        return (
            <div className={cssClass} data-focus='input-text' ref='inputText' style={style}>
                <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                <label className='mdl-textfield__label' htmlFor={name}>{this.i18n(placeholder)}</label>
                {error && <span className='mdl-textfield__error'>{error}</span>}
            </div>
        );
    }
}

//Static props.
InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;
