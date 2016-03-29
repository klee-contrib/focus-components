import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';

@MDBehaviour('materialInput')
@ComponentBaseBehaviour
class AutocompleteTextEdit extends Component {
    static defaultProps = {
        placeholder: 'Search here...'
    };

    static propTypes = {
        querySearcher: PropTypes.func.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        error: PropTypes.string,
        placeholder: PropTypes.string
    };

    state = {
        inputValue: this.props.value,
        suggestions: [],
        hasSuggestions: false,
        error: this.props.error
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
    // Sets the hasSuggestions' state if the given object has a none empty array
    _querySearcher = value => {
        const {querySearcher} = this.props;
        querySearcher(value).then(({data, totalCount}) => {
            if(totalCount > 0) {
                this.setState({hasSuggestions: true, suggestions: data, error: ''});
                this.refs.materialInput.classList.remove('is-invalid');
            }
            else if(totalCount === 0) {
                this.setState({error: 'No data founded'});
                this.refs.materialInput.classList.add('is-invalid');
            }
            else if(totalCount === 1 && data[0].key == 'ERR') {
                //Here temporary solution to give the opportunity for the dev to have a error list dropdown message
                this.setState({hasSuggestions: true, suggestions: data, error: ''});
                this.refs.materialInput.classList.remove('is-invalid');
            }
        }).catch((error) => {
            // HERE, IT WILL SHOW MDL ERROR INPUT
            this.setState({error: error.message});
        });
    }

    // Sets the state's inputValue when the user is typing
    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        this._querySearcher(value);
    }

    onResultClick(value) {
        this.refs.inputText.value = value;
        this.setState({inputValue: value, hasSuggestions: false});
        return value;
    }

    // Returns an html list whith the Suggestions
    renderSuggestions = () => {
        const {suggestions} = this.state;
        const allSuggestions = suggestions.map(({key, label}, index) => <li ref={`result${index}`} key={key} onClick={() => {this.onResultClick(label)}} data-focus='option' >{label}</li>);
        return(
            <ul ref='suggestions' data-focus='options'>
                {allSuggestions}
            </ul>
        );
    }

    //Maybe give the option for the floating label
    render() {
        const {inputValue, hasSuggestions, error, ...otherProps} = this.state;
        const {placeholder} = this.props
        return(
            <div data-focus='autocompleteText'>
                <div className='mdl-textfield mdl-js-textfield' ref='materialInput'>
                    <input className='mdl-textfield__input' type='text' value={inputValue} ref='inputText' onChange={::this.onQueryChange} {...otherProps} />
                    <label className="mdl-textfield__label">{placeholder}</label>
                    <span className="mdl-textfield__error">{error}</span>
                </div>
                {hasSuggestions &&
                    this.renderSuggestions()
                }
            </div>
        );
    }
}

export default AutocompleteTextEdit;
