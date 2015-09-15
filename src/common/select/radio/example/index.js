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
                    values={[{code: "A", label: "Value A"}, {code: "B", label: "Value B"}, {code: "C", label: "Value C"}]} ref="mySelectRadio" />
                <br/>
                <button onClick={this.handleGetValueClick}>Get the selected value</button>
            </div>);
    }
});


return <SelectRadioSample />;
