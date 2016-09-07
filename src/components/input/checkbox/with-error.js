import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import Material from '../../../behaviours/material';

const propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    error: PropTypes.string
};

const defaultProps = {
    value: false
};

@Material('mdlHolder')
class InputCheckBoxWithError extends Component {
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

    handleOnChange({target: {checked}}) {
        const {onChange} = this.props;
        onChange(checked);
    }

    render() {
        const {label, value, error} = this.props;
        return (
            <div data-error={!!error} data-focus='input-checkbox-with-error-container'>
                <label className={'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'} data-focus='input-checkbox' ref='mdlHolder'>
                    <input checked={value} className='mdl-checkbox__input' onChange={::this.handleOnChange} ref='checkbox' type='checkbox'/>
                    {label && <span className='mdl-checkbox__label'>{i18next.t(label)}</span>}
                    {error && <span className='input-checkbox__error'>{i18next.t(error)}</span>}
                </label>
            </div>
        );
    }
}

InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;
export default InputCheckBoxWithError;
