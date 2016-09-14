import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import Material from '../../behaviours/material';

const propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};

const defaultProps = {
    value: false
};

const displayName = 'InputToggle';

@Material('mdlHolder')
class InputToggle extends Component {
    getValue = () => {
        const domElement = ReactDOM.findDOMNode(this.refs.toggle);
        return domElement.checked;
    };

    handleOnChange = ({target: {checked}}) => {
        const {onChange} = this.props;
        onChange(checked);
    };

    render() {
        const {label, value} = this.props;
        return (
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' data-focus='input-toggle' ref='mdlHolder'>
                <input checked={value} className='mdl-switch__input' onChange={this.handleOnChange} ref='toggle' type='checkbox' />
                {label && <span className='mdl-switch__label'>{i18next.t(label)}</span>}
            </label>
        );
    }
}

InputToggle.propTypes = propTypes;
InputToggle.defaultProps = defaultProps;
InputToggle.displayName = displayName;

export default InputToggle;
