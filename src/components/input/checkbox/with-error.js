import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Translation from '../../../behaviours/translation';
import Material from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';

const propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    error: PropTypes.string
};

const defaultProps = {
    value: false
};

@Translation
@Material('mdlHolder')
class InputCheckBoxWithError extends Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    getValue = () => {
        const domElement = ReactDOM.findDOMNode(this.refs.checkbox);
        return domElement.checked;
    };

    componentDidUpdate() {
        const { value } = this.props;
        const method = value ? 'add' : 'remove';
        const node = ReactDOM.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    }

    handleOnChange({ target: { checked } }) {
        const { onChange } = this.props;
        onChange(checked);
    }

    render() {
        const validInputProps = filterProps(this.props);

        const { label, value, disabled, error } = this.props;

        validInputProps.onChange = this.handleOnChange;
        const inputProps = { ...validInputProps, type: 'checkbox', disabled, checked: value, className: 'mdl-checkbox__input' };
        delete inputProps.value;

        return (
            <div data-error={!!error} data-focus='input-checkbox-with-error-container'>
                <label className={'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'} data-focus='input-checkbox' ref='mdlHolder'>
                    <input ref='checkbox' {...inputProps} />
                    {label && <span className='mdl-checkbox__label'>{this.i18n(label)}</span>}
                    {error && <span className='input-checkbox__error'>{this.i18n(error)}</span>}
                </label>
            </div>
        );
    }
}

InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;

export default InputCheckBoxWithError;
