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
        results: [],
        hasResults: false
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
            if(data.length > 0)
                this.setState({hasResults: true});
        });
    }

    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        this._querySearcher(value);
    }

    _renderResults = () => {
        const {results} = this.state;
        const allResults = results.map(({key, label}, index) => <li ref={`result${index}`} key={key}>{label}</li>);
        return(
            <ul ref='results'>
                {allResults}
            </ul>
        );
    }

    render() {
        const {inputValue, hasResults, ...otherProps} = this.state;
        return(
            <div>
                <input type='text' value={inputValue} ref='inputText' onChange={::this.onQueryChange} {...otherProps} />
                {hasResults &&
                    this._renderResults()
                }
            </div>
        );
    }
}

export default AutocompleteText;
