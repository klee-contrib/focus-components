const SelectRadio = FocusComponents.common.select.radio.component;

const SelectRadioSample = React.createClass({

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick(){
        const value = this.refs.mySelectRadio.getValue();
        alert('Selected values ID: ' + value);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <SelectRadio
                    value='B'
                    values={[{value: "A", label: "Value A"}, {value: "B", label: "Value B"}, {value: "C", label: "Value C"}]} ref="mySelectRadio" />
                <br/>
                <button onClick={this.handleGetValueClick}>Get the selected value</button>
            </div>);
    }
});


return <SelectRadioSample />;
