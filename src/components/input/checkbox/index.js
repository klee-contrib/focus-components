import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Translation from '../../../behaviours/translation';
import Material from '../../../behaviours/material';
import {InputBehaviour} from '../../../behaviours/input-component';

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
@InputBehaviour
class InputCheckBox extends Component {
    getValue = () => {
        const domElement = ReactDOM.findDOMNode(this.refs.checkbox);
        return domElement.checked;
    };

    componentDidUpdate() {
        const {value} = this.props;
        const method = value ? 'add' : 'remove';
        const node = ReactDOM.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    }

    handleOnChange = ({target: {checked}}) => {
        const {onChange} = this.props;
        onChange(checked);
    }

    render() {
        const validInputProps = this._checkProps(this.props);

        const {label, value, disabled} = this.props;

        validInputProps.onChange = this.handleOnChange;
        const inputProps = {...validInputProps};

        return (
            <div data-focus='input-checkbox-container'>
                <label className={'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'} data-focus='input-checkbox' ref='mdlHolder'>
                    <input checked={value} className='mdl-checkbox__input' disabled={disabled} ref='checkbox' type='checkbox' {...inputProps}/>
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
