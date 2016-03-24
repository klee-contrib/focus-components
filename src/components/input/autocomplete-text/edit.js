import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

@ComponentBaseBehaviour
class AutocompleteText extends Component {
    static defaultProps = {

    };

    static propTypes = {
        querySearcher: PropTypes.func,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    state = {
        inputValue: this.props.value
    };

    getValue() {
        const {inputValue} = this.state;

        if(inputValue !== undefined)
            return inputValue;
        else
            return null;
    }

    onQueryChange({target: {value}}) {
        this.setState({inputValue: value});
    }

    render() {
        const {inputValue} = this.state;
        return(
            <div>
                <input type='text' value={inputValue} ref='inputText' onChange={::this.onQueryChange} />
            </div>
        );
    }
}

export default AutocompleteText;
