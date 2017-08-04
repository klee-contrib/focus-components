import { component as InputRadio } from 'focus-components/common/inpunt/radio';

const InputRadioSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>With value : False</h3>
                <div>
                    <InputRadio name="options1" value={false} label="Value False" />
                </div>
                <h3>With value : True</h3>
                <div>
                    <InputRadio name="options2" value label="Value True" />
                </div>
            </div>
        );
    }
});

return <InputRadioSample />;
