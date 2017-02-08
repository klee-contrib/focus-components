//dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {identity} from 'lodash/utility';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';
import {InputBehaviour} from '../../../behaviours/input-component';
const MODE = {isEdit: true};

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
@InputBehaviour
class InputText extends Component {

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */
    getValue = () => {
        const {unformatter} = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);
        return unformatter(domEl.value, MODE);
    };
    componentDidUpdate() {
        const {error} = this.props;
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
        const {unformatter, onChange} = this.props;
        const {value} = evt.target;
        return onChange(unformatter(value, MODE));
    };

    // /**
    // * comments will be right there
    // */
    // _checkProps = (props) => {
    //     let validInputProps = {};
    //     let invalidInputProps = {};
    //
    //     Object.keys(props).map(key => {
    //         if(key === inputHtmlAttributes[inputHtmlAttributes.indexOf(key)]) {
    //             let value = key === 'value' ? props.formatter(props[key], MODE) : key === 'onChange' ? this._handleInputChange : props[key];
    //             validInputProps[key] = value;
    //         } else {
    //             invalidInputProps[key] = props[key];
    //         }
    //     });
    //     const managedProps = [validInputProps, invalidInputProps];
    //     return managedProps;
    // };
    /**
    * @inheritdoc
    * @override
    */
    render() {
        const managedProps = this._checkProps(this.props);

        const validInputProps = managedProps[0];
        const invalidInputProps = managedProps[1]

        const { name, placeholder, value: valueToFormat } = validInputProps;

        validInputProps.value = this.props.formatter(valueToFormat, MODE);
        validInputProps.onChange = this._handleInputChange;

        const { error, style } = invalidInputProps;

        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.

        const inputProps = {...validInputProps, pattern};
        const cssClass = `mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`;

        return (
            <div className={cssClass} data-focus='input-text' ref='inputText' style={style}>
                <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                <label className='mdl-textfield__label' htmlFor={name}>{this.i18n(placeholder)}</label>
                {error && <span className='mdl-textfield__error'>{this.i18n(error)}</span>}
            </div>
        );
    }
}

//Static props.
InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;
