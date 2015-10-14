const Input = FocusComponents.components.input.Text;

const InputTextExample =  React.createClass({
    onChangeInput(name){
        return (value)=>{
            this.setState({[name]: value});
        };
    },
    getInitialState(){
            return {inputWithValue: 'myAwesomeValue', inputWithError: 'errorValue'};
    },
    render(){
        const {inputWithValue, inputWithoutValue, inputWithError, inputGetTheValue} =  this.state;
        return (
            <form>
                <h3>Input with value</h3>
                <Input name='inputWithValue' value={inputWithValue} onChange={this.onChangeInput('inputWithValue')} />

                <h3>Without value</h3>
                <Input placeholder="Put your value here..." name='inputWithoutValue' value={inputWithoutValue} onChange={this.onChangeInput('inputWithoutValue')}/>

                <h3>Input with error</h3>
                <Input value="Lorem Ipsum" error="Hey! you've done someting wrong!" name='inputWithError' value={inputWithError} onChange={this.onChangeInput('inputWithError')}/>

                <h3>Get the value</h3>
                <Input value="Lorem Ipsum" ref="myInputText" name='inputGetTheValue' value={inputGetTheValue} onChange={this.onChangeInput('inputGetTheValue')}/>
                <button onClick={()=>{alert(this.refs.myInputText.getValue())}}>Get the input value</button>
            </form>
        );
    }
});

return <InputTextExample/>;
