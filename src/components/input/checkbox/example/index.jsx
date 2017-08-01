import React, { Component } from 'react';
import Checkbox from 'focus-components/components/input/checkbox';
import CheckboxWithError from 'focus-components/components/input/checkbox/with-error';

class InputCheckboxSample extends Component {

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick = () => {
        const value = this.refs.cbTestGetValue.getValue();
        alert('Checkbox value: ' + value);
    }

    state = {
        controllableCheckbox: true,
        standardCheckbox: true,
        valueCheckbox: true,
        withErrorCheckbox: false,
        withoutLabelCheckbox: true
    }

    onChangeInput(name) {
        return value => {
            this.setState({ [name]: value });
        };
    }

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        const { controllableCheckbox, standardCheckbox, valueCheckbox, withErrorCheckbox, withoutLabelCheckbox } = this.state;
        const error = withErrorCheckbox ? null : 'To proceed, you must agree with the terms and conditions of the License Agreement.';

        return (
            <div>
                <h3>Standard checkbox</h3>
                <Checkbox label='My awsome checkbox' value={standardCheckbox} onChange={this.onChangeInput('standardCheckbox')} />

                <h3>Controllable checkbox</h3>
                <Checkbox label='My awsome checkbox' value={controllableCheckbox} onChange={this.onChangeInput('controllableCheckbox')} />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => { this.setState({ controllableCheckbox: !controllableCheckbox }) }}>
                    Toggle the checkbox value
                </button>

                <h3>Without label</h3>
                <Checkbox value={withoutLabelCheckbox} onChange={this.onChangeInput('withoutLabelCheckbox')} />

                <h3>Get Checkbox value</h3>
                <Checkbox label='My awsome checkbox' ref='cbTestGetValue' value={valueCheckbox} onChange={this.onChangeInput('valueCheckbox')} />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.handleGetValueClick}>
                    Get the checkbox value
                </button>

                <h3>Display Checkbox with an error</h3>
                <CheckboxWithError label='I have read and accepted the Terms and Conditions and Risk' value={withErrorCheckbox} onChange={this.onChangeInput('withErrorCheckbox')} error={error} />
            </div>
        );
    }
}

export default InputCheckboxSample;
