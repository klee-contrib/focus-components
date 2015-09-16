//dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {identity} from 'lodash/utility';
import ComponentBaseBehaviour from '../../behaviours/component-base';
import MDBehaviour from '../../behaviours/material';

const propTypes = {
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
    type: 'text',
    formatter: identity,
    unformatter: identity
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
        return unformatter(domEl.value);
    }
    /**
     * Handle the change on the input text, it only propagate the value.
     * @param  {object} evt - The react DOM event.
     * @return {object} - The function onChannge from the props, called.
     */
    _handleOnChange = (evt) =>{
        const {unformatter, onChange} = this.props;
        const {value} = evt.target;
        return onChange(unformatter(value));
    }
    /**
     * @inheritdoc
     * @override
    */
    render() {
        const {error, name, placeholder, style, value: rawValue, formatter} = this.props;
        const value = formatter(rawValue);
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const inputProps = {...this.props, value, id: name, onChange: this._handleInputChange, pattern};
        return (
            <div ref='inputText' className='mdl-textfield mdl-js-textfield' data-focus='input-text' style={style}>
                <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                <label className='mdl-textfield__label' htmlFor={name}>{this.i18n(placeholder)}</label>
                {error &&
                    <span className="mdl-textfield__error">{error}</span>
                }
            </div>
        );
    }
}

//Static props.
InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;
