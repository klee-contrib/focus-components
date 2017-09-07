import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import identity from 'lodash/utility/identity';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';

const propTypes = {
    cols: PropTypes.number,
    error: PropTypes.string,
    formatter: PropTypes.func,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
    //required: PropTypes.bool,
    rows: PropTypes.number,
    type: PropTypes.string,
    unformatter: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    wrap: PropTypes.string
};

const defaultProps = {
    type: 'text',
    formatter: identity,
    unformatter: identity,
    minLength: 0,
    wrap: 'soft',
    //required: false,
    rows: 6,
    cols: 50
};


/**
* Component standing for an HTML input.
*/
@MDBehaviour('inputTextarea')
@ComponentBaseBehaviour
class InputTextarea extends Component {

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */
    getValue = () => {
        const { unformatter } = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);
        return unformatter(domEl.value);
    };

    /**
    * Handle the change on the input text, it only propagate the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChannge from the props, called.
    */
    _handleInputChange = (evt) => {
        const { unformatter, onChange } = this.props;
        const { value } = evt.target;
        return onChange(unformatter(value));
    };

    /**
    * @inheritdoc
    * @override
    */
    render() {
        const validInputProps = filterProps(this.props);

        const { formatter, error } = this.props;
        const { name, style, placeholder, value } = validInputProps;

        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const mdlClasses = `mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`;

        validInputProps.value = formatter(value) === undefined || formatter(value) === null ? '' : formatter(value);
        validInputProps.onChange = this._handleInputChange
        const inputProps = { ...validInputProps, pattern };

        return (
            <div data-error={!!error} data-focus='input-textarea'>
                <div className={mdlClasses} ref='inputTextarea' style={style}>
                    <textarea className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                    <label className='mdl-textfield__label' htmlFor={name}>{this.i18n(placeholder)}</label>
                </div>
                {error && <div className='label-error' ref='error'>{error}</div>}
            </div>
        );
    }
}

//Static props.
InputTextarea.displayName = 'InputTextarea';
InputTextarea.defaultProps = defaultProps;
InputTextarea.propTypes = propTypes;

export default InputTextarea;
