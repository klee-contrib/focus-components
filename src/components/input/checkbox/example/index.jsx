// Dependencies

const {Component} = React;

// Components

const {Checkbox} = FocusComponents.components.input;

class InputCheckboxSample extends Component {
    /**
    * Handle click action to get check value.
    */
    handleGetValueClick = () => {
        const value = this.refs.cbTestGetValue.getValue();
        alert('Checkbox value: ' + value);
    }

    state = {
        controllableCheckbox: true
    }

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        const {controllableCheckbox} = this.state;
        return (
            <div>
                <h1>Input checkbox</h1>
                <h3>Standard checkbox</h3>
                <Checkbox label='My awsome checkbox' value={true}/>

                <h3>Controllable checkbox</h3>
                <Checkbox label='My awsome checkbox' value={controllableCheckbox} />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => {this.setState({controllableCheckbox: !controllableCheckbox})}}>
                    Toggle the checkbox value
                </button>
                <h3>Without label</h3>
                <Checkbox value={true} />

                <h3>Get Checkbox value</h3>
                <Checkbox label='My awsome checkbox' ref='cbTestGetValue' value={true}/>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.handleGetValueClick}>
                    Get the checkbox value
                </button>
            </div>
        );
    }
}

module.exports = InputCheckboxSample;
