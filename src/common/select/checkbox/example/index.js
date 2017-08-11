
import pull from 'lodash/array/pull';
const possibleValues = [{ value: 'A', label: 'Value A' }, { value: 'B', label: 'Value B' }, { value: 'C', label: 'Value C' }, { value: 'D', label: 'Value D' }];

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
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({ value: selectedValues });
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
                <SelectCheckbox
                    values={possibleValues} ref='mySelectCheckbox'
                />
                <h3>List of checkboxes with preselected values</h3>
                <SelectCheckbox
                    value={['B']}
                    values={possibleValues} ref='mySelectCheckbox'
                />
                <br />
                <button onClick={this.handleGetValueClick}>Get the selected values</button>
                <h3>Add OnChange event</h3>
                <SelectCheckbox
                    value={this.state.selectedValues}
                    values={possibleValues} ref='mySelectCheckbox2' onChange={this.handleGetValueClick2}
                />
            </div>
        );
    }
});

return <SelectCheckboxSample />;
