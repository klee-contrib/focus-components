// Components
import { component as Checkbox } from 'focus-components/common/input/checkbox';

const InputCheckboxSample = React.createClass({
    /**
    * Handle click action to get check value.
    */
    handleGetValueClick() {
        const value = this.refs.cbTestGetValue.getValue();
        alert('Checkbox value: ' + value);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Input checkbox</h3>
                <Checkbox value label='My awsome checkbox' />

                <h3>Unselected checkbox</h3>
                <Checkbox value={false} label='My awsome checkbox' />

                <h3>Without label</h3>
                <Checkbox value />

                <h3>Get Checkbox value</h3>
                <div style={{ float: 'left', width: '300px' }}>
                    <Checkbox value label='My awsome checkbox' ref='cbTestGetValue' />
                </div>
                <div style={{ marginLeft: '300px' }}>
                    <button onClick={this.handleGetValueClick}>Get the checkbox value</button>
                </div>
            </div>);
    }
});

return <InputCheckboxSample />;
