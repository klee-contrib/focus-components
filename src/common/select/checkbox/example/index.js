
const SelectCheckbox = FocusComponents.common.select.checkbox.component;

const SelectCheckboxSample = React.createClass({

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick(){
        const values = this.refs.mySelectCheckbox.getValues();
        alert('Selected values IDs: ' + values);
    },


    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <SelectCheckbox
                    value={["B"]}
                    values={[{value: "A", label: "Value A"},{value: "B", label: "Value B"}, {value: "C", label: "Value C"}, {value: "D", label: "Value D"}]} ref="mySelectCheckbox" />
                <br />
                <button onClick={this.handleGetValueClick}>Get the selected values</button>
            </div>
        );
    }
});

return <SelectCheckboxSample />;
