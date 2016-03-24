import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

@ComponentBaseBehaviour
class AutocompleteText extends Component {
    static defaultProps = {

    };

    static propTypes = {
        querySearcher: PropTypes.func.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    state = {
        inputValue: this.props.value,
        results: []
    };

    getValue() {
        const {inputValue} = this.state;

        if(inputValue !== undefined)
            return inputValue;
        else
            return null;
    }

    _querySearcher = value => {
        const {querySearcher} = this.props;
        querySearcher(value).then(({data, totalCount}) => {
            this.setState({results: data});
        });
    };

    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        this._querySearcher(value);
    };

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
