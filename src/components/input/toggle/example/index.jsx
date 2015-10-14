// Dependencies

const {Component} = React;

// Components

const Toggle = FocusComponents.components.input.Toggle;

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
                <Toggle label='My awsome toggle' value={true}/>

                <h3>Unselected toggle</h3>
                <Toggle label='My awsome toggle' value={false} />

                <h3>Without label</h3>
                <Toggle value={true} />

                <h3>Get Toggle value</h3>
                <div style={{float: 'left', width: '300px'}}>
                    <Toggle label='My awsome toggle' ref='toggleTestGetValue' value={true}/>
                </div>
                <div style={{marginLeft: '300px'}}>
                    <button onClick={this.handleGetValueClick}>Get the toggle value</button>
                </div>
        </div>);
    }
}

return <InputToggleSample />;
