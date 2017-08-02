import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Translation from '../../../behaviours/translation';
import Material from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';

const propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};

const defaultProps = {
    value: false,
    disabled: false
};

const displayName = 'InputCheckBox';

@Translation
@Material('mdlHolder')
class InputCheckBox extends Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    getValue = () => {
        return this.props.value;
    };

    componentDidUpdate() {
        const { value } = this.props;
        const method = value ? 'add' : 'remove';
        const node = ReactDOM.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    }

    handleOnChange = ({ target: { checked } }) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(checked);
        }
    }

    render() {
        const validInputProps = filterProps(this.props);

        const { label, value, disabled } = this.props;

        validInputProps.onChange = this.handleOnChange;
        const inputProps = { ...validInputProps, type: 'checkbox', disabled, checked: value, className: 'mdl-checkbox__input' };
        delete inputProps.value;

        return (
            <div data-focus='input-checkbox-container'>
                <label className={'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'} data-focus='input-checkbox' ref='mdlHolder'>
                    <input ref='checkbox' {...inputProps} />
                    {label && <span className='mdl-checkbox__label'>{this.i18n(label)}</span>}
                </label>
            </div>
        );
    }
}

InputCheckBox.propTypes = propTypes;
InputCheckBox.defaultProps = defaultProps;
InputCheckBox.displayName = displayName;

export default InputCheckBox;
