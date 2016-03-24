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

    // Returns the state's inputValue
    getValue = () =>  {
        const {inputValue} = this.state;

        if(inputValue !== undefined)
            return inputValue;
        else
            return null;
    }

    // Get the defined props' querySearch and return the object given by the promise
    // Sets the hasResults' state if the given object has a none empty array
    _querySearcher = value => {
        const {querySearcher} = this.props;
        querySearcher(value).then(({data, totalCount}) => {
            this.setState({results: data});
            if(data.length > 0)
                this.setState({hasResults: true});
        });
    }

    // Sets the state's inputValue when the user is typing
    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        this._querySearcher(value);
    }

    // Renders an html list whith the results
    renderResults = () => {
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
                    this.renderResults()
                }
            </div>
        );
    }
}

export default AutocompleteText;
