//dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import identity from 'lodash/utility/identity';
import { v4 as uuid } from 'uuid';

import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';
const MODE = { isEdit: true };

const propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
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
        const { unformatter } = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);

        return unformatter(domEl.value, MODE);
    };

    componentDidUpdate() {
        const { error } = this.props;
        if (!error) {
            // Make sure that the main div does not hold a is-invalid class when there's no error
            // MDL keeps the class even if React removes it
            this.refs.inputText.classList.remove('is-invalid');
        }
    }

    /**
    * Handle the change on the input text, it only propagate the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChannge from the props, called.
    */
    _handleInputChange = (evt) => {
        const { unformatter, onChange } = this.props;
        const { value } = evt.target;

        return onChange(unformatter(value, MODE));
    };

    /**
    * @inheritdoc
    * @override
    */
    render() {
        const validInputProps = filterProps(this.props);
        const { error, style } = this.props;
        const { name, placeholder, value: valueToFormat } = validInputProps;

        validInputProps.value = this.props.formatter(valueToFormat, MODE);
        validInputProps.onChange = this._handleInputChange;

        // To prevent regression
        if (validInputProps.name) {
            validInputProps.id = validInputProps.name;
        }
        if (validInputProps.placeholder) {
            validInputProps.placeholder = this.i18n(validInputProps.placeholder);
        }

        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.

        const inputProps = { ...validInputProps, pattern };
        // Label is not valid on input
        delete inputProps.label;

        let errorId = null;
        if (error) {
            inputProps['aria-invalid'] = true;
            errorId = uuid();
            inputProps['aria-describedby'] = errorId;
        }
        const cssClass = `mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`;

        return (
            <div className={cssClass} data-focus='input-text' ref='inputText' style={style}>
                <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                <label className='mdl-textfield__label' htmlFor={name}>{this.i18n(placeholder)}</label>
                {error && (<span className='mdl-textfield__error' id={errorId}>{this.i18n(error)}</span>)}
            </div>
        );
    }
}

//Static props.
InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;
