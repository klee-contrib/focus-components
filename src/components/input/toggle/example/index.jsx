import React, { Component } from 'react';
import Toggle from 'focus-components/components/input/toggle';

class InputToggleSample extends Component {
    /**
    * Handle click action to get check value.
    */
    handleGetValueClick = () => {
        const value = this.refs.toggleTestGetValue.getValue();
        alert('Toggle value: ' + value);
    }

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Input toggle</h3>
                <Toggle label='My awsome toggle' value />

                <h3>Unselected toggle</h3>
                <Toggle label='My awsome toggle' value={false} />

                <h3>Without label</h3>
                <Toggle value />

                <h3>Get Toggle value</h3>
                <div style={{ float: 'left', width: '300px' }}>
                    <Toggle label='My awsome toggle' ref='toggleTestGetValue' value />
                </div>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.handleGetValueClick}>Get the toggle value</button>
            </div>);
    }
}

export default InputToggleSample;
