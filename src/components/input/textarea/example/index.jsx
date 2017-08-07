import TextArea from 'focus-components/components/input/textarea';

const InputTextAreaSample = React.createClass({

    onChangeInput(name) {
        return (value) => {
            this.setState({ [name]: value });
        };
    },

    getInitialState() {
        return {
            inputWithValue0: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a accumsan dolor. Nullam in euismod risus.\n Integer finibus tellus porta tristique tincidunt. Mauris ac velit a nulla ultricies aliquet vitae facilisis lectus. Praesent eget eleifend augue. Curabitur vel metus feugiat, faucibus elit eu, mollis mi. Integer viverra finibus est, a tristique sem pharetra ut. Aenean dignissim, leo eu eleifend tincidunt, ex erat vulputate purus, nec commodo felis velit ac augue. Duis sed iaculis quam, quis dictum augue. Duis ac leo dolor. Integer sit amet quam metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum aliquam mollis felis, non consectetur sem fermentum ac. Vivamus facilisis eleifend leo non tincidunt. Nam orci eros, blandit aliquam sodales vitae, ultrices ac sem. Nunc quis dui a est fringilla faucibus.',
            inputWithValue4: 'This is the value',
            inputWithError: 'This field has an error'
        };
    },

    render() {
        const { inputWithValue0, inputWithValue1, inputWithValue2, inputWithValue3, inputWithValue4, inputWithError } = this.state;

        return (
            <div>
                <h3>Default textarea</h3>
                <TextArea
                    name='ta0'
                    value={inputWithValue0}
                    onChange={this.onChangeInput('inputWithValue0')} />
                <h3>Default textarea with placeholder</h3>
                <TextArea
                    name='ta1'
                    value={inputWithValue1}
                    placeholder='Enter you text here'
                    onChange={this.onChangeInput('inputWithValue1')} />
                <h3>With specified cols (85) and rows(2) props</h3>
                <TextArea
                    name='ta2'
                    value={inputWithValue2}
                    placeholder='Enter you text here'
                    cols={85}
                    rows={2}
                    onChange={this.onChangeInput('inputWithValue2')} />
                <h3>With specified maxLength props</h3>
                <TextArea
                    name='ta3'
                    value={inputWithValue3}
                    placeholder="Enter you text here"
                    maxLength={10}
                    onChange={this.onChangeInput('inputWithValue3')} />
                <h3>Get the value</h3>
                <TextArea
                    name='ta4'
                    value={inputWithValue4}
                    onChange={this.onChangeInput('inputWithValue4')} />
                <h3>Input with error</h3>
                <TextArea
                    name='ta5'
                    value={inputWithError}
                    onChange={this.onChangeInput('inputWithError')}
                    error='This is an error' />
                <br />
                <br />
                <br />
            </div>
        );
    }
});

export default InputTextAreaSample;
