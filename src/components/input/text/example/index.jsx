import Input from 'focus-components/components/input/text';

class InputTextExample extends React.Component {

    state = {
        inputWithValue: 'myAwesomeValue',
        inputWithError: 'errorValue'
    }

    onChangeInput(name) {
        return value => {
            this.setState({ [name]: value });
        };
    }

    render() {
        const { inputWithValue, inputWithoutValue, inputWithError, inputGetTheValue } = this.state;
        return (
            <form>
                <h3>Input with value</h3>
                <Input name='inputWithValue' value={inputWithValue} onChange={this.onChangeInput('inputWithValue')} />

                <h3>Without value</h3>
                <Input placeholder='Put your value here...' name='inputWithoutValue' value={inputWithoutValue} onChange={this.onChangeInput('inputWithoutValue')} />

                <h3>Input with error</h3>
                <Input value='Lorem Ipsum' error="Hey! you've done someting wrong!" name='inputWithError' value={inputWithError} onChange={this.onChangeInput('inputWithError')} />

                <h3>Get the value</h3>
                <Input value='Lorem Ipsum' ref='myInputText' name='inputGetTheValue' value={inputGetTheValue} onChange={this.onChangeInput('inputGetTheValue')} />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => { alert(this.refs.myInputText.getValue()) }}>
                    Get the input value
                </button>
            </form>
        );
    }
}

export default InputTextExample;
