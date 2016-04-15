const {SelectCheckBox} = FocusComponents.components;
const {Button} = FocusComponents.components;
const {pull} = _;

const possibleValues = [
    {
        value: 'A', label: 'Value A'
    },
    {
        value: 'B', label: 'Value B'
    },
    {
        value: 'C', label: 'Value C'
    },
    {
        value: 'D', label: 'Value D'
    }
];

const SelectCheckboxSample = React.createClass({

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick() {
        const values = this.refs.mySelectCheckbox.getValue();
        alert('Selected values IDs: ' + values);
    },


    /** @inheritdoc */
    getInitialState() {
        return {
            selectedValues: ['B']
        };
    },

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick2(key, newStatus) {
        const selectedValues = this.state.selectedValues;
        if(newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({value: selectedValues});
        alert('Selected values IDs: ' + this.state.selectedValues);
    },


    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>List of checkboxes</h3>
                <SelectCheckBox value={['B','D']} values={possibleValues} ref="mySelectCheckbox" />
                <h3>List of checkboxes with preselected values</h3>
                <SelectCheckBox
                    value={['A']}
                    values={possibleValues} ref="mySelectCheckbox"
                    />
                <br />
                <Button onClick={this.handleGetValueClick} hasRipple={true} label='Selected values' color='primary' />
                <h3>Add OnChange event</h3>
                <SelectCheckBox
                    value={['B','C','D']}
                    values={possibleValues} ref="mySelectCheckbox2" onChange={this.handleGetValueClick2}
                    />
            </div>
        );
    }
});

module.exports = SelectCheckboxSample;
