import { component as SelectRadio } from 'focus-components/common/select/radio';

const values = [{ code: 'A', label: 'Value A' }, { code: 'B', label: 'Value B' }, { code: 'C', label: 'Value C' }];

const SelectRadioSample = React.createClass({

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick() {
        const value = this.refs.mySelectRadio.getValue();
        alert('Selected values ID: ' + value);
    },

    /** @inheritdoc */
    getInitialState() {
        return {
            value: 'A'
        };
    },

    /**
    * Handle click action to get check value.
    */
    handleOnChange(newValue) {
        this.setState({ value: newValue });
        alert('Selected values ID: ' + newValue);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Classic select radio</h3>
                <SelectRadio
                    value='B'
                    values={values} />
                <h3>Classic select radio</h3>
                <SelectRadio
                    value='B'
                    values={values} ref="mySelectRadio" />
                <br />
                <button onClick={this.handleGetValueClick}>Get the selected value</button>
                <h3>OnChange event overload</h3>
                <SelectRadio
                    value={this.state.value}
                    values={values} onChange={this.handleOnChange} />
            </div>);
    }
});


return <SelectRadioSample />;
