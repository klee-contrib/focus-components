import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Translation from '../../behaviours/translation';
import Material from '../../behaviours/material';

const propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool.isRequired
};

const defaultProps = {
    value: false
};

const displayName = 'InputCheckBox';

@Translation
@Material('checkbox')
class InputCheckBox extends Component {
    getValue = () => {
        const domElement = ReactDOM.findDOMNode(this.refs.checkbox);
        return domElement.checked;
    }

    handleOnChange = ({target: {checked}}) => {
        const {handleOnChange} = this.props;
        handleOnChange(checked);
    }

    render() {
        const {label, value} = this.props;
        return (
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" data-focus="input-checkbox">
                <input checked={value} className='mdl-checkbox__input' onChange={this.handleOnChange} ref='checkbox' type='checkbox' />
                {label && <span className="mdl-checkbox__label">{this.i18n(label)}</span>}
            </label>
        );
    }
}

InputCheckBox.propTypes = propTypes;
InputCheckBox.defaultProps = defaultProps;
InputCheckBox.displayName = displayName;

export default InputCheckBox;
