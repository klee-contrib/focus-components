import SelectCheckbox from 'focus-components/components/input/select-checkbox';
import Button from 'focus-components/components/button';
import { pull } from 'lodash';

const possibleValues = [
    { value: 'A', label: 'Value A' },
    { value: 'B', label: 'Value B' },
    { value: 'C', label: 'Value C' },
    { value: 'D', label: 'Value D' }
];

const SelectCheckboxSample = React.createClass({

    /** @inheritdoc */
    getInitialState() {
        return {
            selectedValues: ['A', 'B', 'D']
        };
    },

    /**
    * Handle click action to get check value.
    */
    getValueClick() {
        const values = this.refs.mySelectCheckbox.getValue();
        alert('Selected values IDs: ' + values);
    },

    /**
    * Handle click action to get check value.
    */
    customGetValueClick(key, newStatus) {
        const selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({ value: selectedValues });
        console.log('Selected values IDs: ' + this.state.selectedValues);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>List of checkboxes</h3>
                <SelectCheckbox values={possibleValues} ref='mySelectCheckbox' />
                <h3>List of checkboxes with preselected values</h3>
                <SelectCheckbox
                    value={['B', 'C']}
                    values={possibleValues} ref='mySelectCheckbox'
                />
                <br />
                <Button onClick={this.getValueClick} hasRipple label='Selected values' color='primary' />
                <h3>Add OnChange event</h3>
                <SelectCheckbox
                    value={this.state.selectedValues}
                    values={possibleValues} ref='mySelectCheckbox2' onChange={this.customGetValueClick}
                />
            </div>
        );
    }
});

export default SelectCheckboxSample;
