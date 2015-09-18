import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Translation from '../../../behaviours/translation';
import Material from '../../../behaviours/material';

const propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};

const defaultProps = {
    value: false
};

const displayName = 'InputToggle';

@Translation
@Material('mdlHolder')
class InputToggle extends Component {
    getValue = () => {
        const domElement = ReactDOM.findDOMNode(this.refs.toggle);
        return domElement.checked;
    }

    handleOnChange = ({target: {checked}}) => {
        const {onChange} = this.props;
        onChange(checked);
    }

    render() {
        const {label, value} = this.props;
        return (
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' data-focus='input-toggle' ref='mdlHolder'>
                <input checked={value} className='mdl-switch__input' onChange={this.handleOnChange} ref='toggle' type='checkbox' />
                {label && <span className='mdl-switch__label'>{this.i18n(label)}</span>}
            </label>
        );
    }
}

InputToggle.propTypes = propTypes;
InputToggle.defaultProps = defaultProps;
InputToggle.displayName = displayName;

export default InputToggle;
