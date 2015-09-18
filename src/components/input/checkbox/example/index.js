// Dependencies

const {Component} = React;

// Components

const Checkbox = FocusComponents.components.input.Checkbox;

class InputCheckboxSample extends Component {
    /**
    * Handle click action to get check value.
    */
    handleGetValueClick = () => {
        const value = this.refs.cbTestGetValue.getValue();
        alert('Checkbox value: ' + value);
    }

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Input checkbox</h3>
                <Checkbox label='My awsome checkbox' value={true}/>

                <h3>Unselected checkbox</h3>
                <Checkbox label='My awsome checkbox' value={false} />

                <h3>Without label</h3>
                <Checkbox value={true} />

                <h3>Get Checkbox value</h3>
                <div style={{float: 'left', width: '300px'}}>
                    <Checkbox label='My awsome checkbox' ref='cbTestGetValue' value={true}/>
                </div>
                <div style={{marginLeft: '300px'}}>
                    <button onClick={this.handleGetValueClick}>Get the checkbox value</button>
                </div>
        </div>);
    }
}

return <InputCheckboxSample />;
