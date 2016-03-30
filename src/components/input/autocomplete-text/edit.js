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
        error: this.props.error,
        hasFocus: false
    };

    // Returns the state's inputValue
    getValue = () =>  {
        const {inputValue} = this.state;
        if(inputValue !== undefined)
        return inputValue;
        else
        return null;
    }
    componentWillUpdate(){
        //console.log('The component will update', this.state, this.props);
    }
    componentDidUpdate() {
        if (this.state.error != '')
        this.refs.inputText.classList.add('is-invalid');
        else
        this.refs.inputText.classList.remove('is-invalid');

    }

    // Get the defined props' querySearch and return the object given by the promise
    // Sets the hasSuggestions' state if the given object has a none empty array
    _querySearcher = value => {
        const {querySearcher} = this.props;
        const {hasSuggestions} = this.state;

        querySearcher(value).then(({data, totalCount}) => {
            if(totalCount > 0) {
                this.setState({hasSuggestions: true, suggestions: data, error: ''});
            }
            else if(totalCount === 0 && this.props.error == '') {
                this.setState({error: 'No data founded'});
            }
            else if(totalCount === 0 && this.props.error != '') {
                this.setState({error: this.props.error});
            }
            else if(totalCount === 1 && data[0].key == 'ERR') {
                //Here temporary solution to give the opportunity for the dev to have a error list dropdown message
                this.setState({hasSuggestions: true, suggestions: data, error: ''});
            }
        }).catch(err => {
            this.setState({error: JSON.stringify(err)});
            this.refs.materialInput.classList.add('is-invalid');
        });
    }

    // Sets the state's inputValue when the user is typing
    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        if(value.trim() == '')
            this.setState({hasSuggestions: false});
        else
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
        const allSuggestions = suggestions.map(({key, label}, index) => <li ref={`result${index}`} key={key} onMouseDown={() => {this.onResultClick(label)}} data-focus='option' >{label}</li>);
        return(
            <ul ref='suggestions' data-focus='options'>
                {allSuggestions}
            </ul>
        );
    }

    toggleHasFocus = e => {
        const {hasSuggestions} = this.state;
        this.setState({hasFocus: !this.state.hasFocus});
        if(hasSuggestions)
        this.setState({hasSuggestions: false})
        return true;
    }

    //Maybe give the option for the floating label
    render() {
        const {inputValue, hasSuggestions, error, hasFocus, ...otherProps} = this.state;
        const {placeholder} = this.props
        return(
            <div data-focus='autocompleteText'>
                <div className='mdl-textfield mdl-js-textfield' ref='materialInput'>
                    <input onFocus={this.toggleHasFocus} onBlur={this.toggleHasFocus} className='mdl-textfield__input' type='text' value={inputValue} ref='inputText' onChange={::this.onQueryChange} {...otherProps} />
                    <label className="mdl-textfield__label">{placeholder}</label>
                    <span className="mdl-textfield__error">{error}</span>
                </div>
                {hasSuggestions && hasFocus &&
                    this.renderSuggestions()
                }
            </div>
        );
    }
}

export default AutocompleteTextEdit;
