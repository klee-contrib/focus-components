const InputText = FocusComponents.common.input.text.component;
import { component as InputText } from 'focus-components/common/input/text';

const InputTextSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Without value</h3>
                <div><InputText placeholder='Put your value here...' /></div>

                <h3>With value</h3>
                <InputText value='Lorem Ipsum' />

                <h3>Input with error</h3>
                <InputText value='Lorem Ipsum' error="Hey! you've done someting wrong!" />

                <h3>Get the value</h3>
                <InputText value='Lorem Ipsum' ref='myInputText' />
                <button onClick={() => { alert(this.refs.myInputText.getValue()) }}>Get the input value</button>
            </div>
        );
    }
});

return <InputTextSample />;
