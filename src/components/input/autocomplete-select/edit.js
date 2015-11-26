import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/function/debounce';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';

@MDBehaviour('loader')
@MDBehaviour('inputText')
@ComponentBaseBehaviour
class Autocomplete extends Component {
    static propTypes = {
        customError: PropTypes.string,
        inputTimeout: PropTypes.number.isRequired,
        keyName: PropTypes.string.isRequired,
        keyResolver: PropTypes.func.isRequired,
        labelName: PropTypes.string.isRequired,
        onBadInput: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        querySearcher: PropTypes.func.isRequired,
        renderOptions: PropTypes.func,
        value: PropTypes.string
    };

    static defaultProps = {
        keyName: 'key',
        labelName: 'label',
        inputTimeout: 200
    };

    state = {
        focus: false,
        inputValue: this.props.value,
        options: new Map(),
        active: null,
        selected: this.props.value,
        fromKeyResolver: false,
        isLoading: false
    };

    componentDidMount() {
        const {value, keyResolver, inputTimeout} = this.props;
        if (value !== undefined && value !== null) { // value is defined, call the keyResolver to get the associated label
            keyResolver(value).then(inputValue => {
                this.setState({inputValue, fromKeyResolver: true});
            }).catch(() => {});
        }
        document.addEventListener('click', this._handleDocumentClick);
        this._debouncedQuerySearcher = debounce(this._querySearcher, inputTimeout);
    }

    componentWillReceiveProps({value}) {
        const {keyResolver} = this.props;
        if (value !== this.props.value && value !== undefined && value !== null) { // value is defined, call the keyResolver to get the associated label
            this.setState({inputValue: value}, () => keyResolver(value).then(inputValue => {
                this.setState({inputValue, fromKeyResolver: true});
            }).catch(() => {}));
        }
    }

    componentDidUpdate() {
        if (this.props.customError) {
            this.refs.inputText.classList.add('is-invalid');
        } else {
            this.refs.inputText.classList.remove('is-invalid');
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
    }

    getValue() {
        const {labelName, keyName, value} = this.props;
        const {inputValue, selected, options, fromKeyResolver} = this.state;
        const resolvedLabel = options.get(selected);
        if (fromKeyResolver) {
            return value
        } else if (resolvedLabel !== inputValue) {
            return null;
        } else {
            return selected;
        }
    }

    _handleDocumentClick = ({target}) => {
        const {focus, inputValue} = this.state;
        const {onBadInput} = this.props;
        if (focus) {
            const dataset = target ? target.dataset: null;
            const reactid = dataset ? dataset.reactid : null;
            const [options, input] = ['options', 'htmlInput'].map(ref => ReactDOM.findDOMNode(this.refs[ref]));
            const optionsId = options ? options.dataset.reactid : null;
            const inputId = input ? input.dataset.reactid : null;
            if (reactid && optionsId && inputId && !reactid.startsWith(optionsId) && !reactid.startsWith(inputId)) {
                this.setState({focus: false}, () => {
                    if (onBadInput && this.getValue() === null && inputValue !== '') {
                        onBadInput(inputValue);
                    }
                });
            }
        }
    };

    _handleQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value, fromKeyResolver: false});
        this._debouncedQuerySearcher(value);
        this.setState({isLoading: true});
    };

    _querySearcher = value => {
        const {querySearcher, keyName, labelName} = this.props;
        querySearcher(value).then(({data, totalCount}) => {
            // TODO handle the incomplete case
            const options = new Map();
            data.forEach(item => {
                options.set(item[keyName], item[labelName]);
            });
            this.setState({options, isLoading: false});
        }).catch(() => {});
    };

    _handleQueryFocus = () => {
        this.refs.options.scrollTop = 0;
        this.setState({active: '', focus: true});
    };

    _handleQueryKeyUp = (event) => {
        event.stopPropagation();
        const {which} = event;
        const {active, options} = this.state;
        if (which === 13 && active) this._select(active);
        if (which === 27) this.setState({focus: false}, () => this.refs.htmlInput.blur());
        if ([40, 38].indexOf(which) !== -1) { // the user pressed on an arrow key, change the active key
            const optionKeys = [];
            for (let key of options.keys()) {
                optionKeys.push(key);
            }
            const currentIndex = optionKeys.indexOf(active);
            let newIndex = currentIndex + (which === 40 ? 1 : -1);
            if (newIndex >= options.size) {
                newIndex -= options.size
            }
            if (newIndex < 0) {
                newIndex += options.size;
            }
            this.setState({active: optionKeys[newIndex]});
        }
    };

    _handleSuggestionHover = key => {
        this.setState({active: key});
    };

    _select(key) {
        const {options} = this.state;
        const {onChange, keyName, labelName} = this.props;
        const resolvedLabel = options.get(key) || '';
        this.refs.htmlInput.blur();
        this.setState({inputValue: this.i18n(resolvedLabel), selected: key, focus: false});
        if (onChange) onChange(key);
    }

    _renderOptions = () => {
        const {active, options, focus} = this.state;
        const renderedOptions = [];
        for (let [key, value] of options) {
            const isActive = active === key;
            renderedOptions.push(
                <li
                    data-active={isActive}
                    data-focus='option'
                    key={key}
                    onClick={this._select.bind(this, key)}
                    onMouseOver={this._handleSuggestionHover.bind(this, key)}
                >
                    {this.i18n(value)}
                </li>
            );
        }
        return (
            <ul data-focus='options' ref='options' data-focussed={focus}>
                {renderedOptions}
            </ul>
        );
    }

    render () {
        const {customError, placeholder, renderOptions, ...inputProps} = this.props;
        const {inputValue, isLoading} = this.state;
        const {_handleQueryFocus, _handleQueryKeyUp, _handleQueryChange} = this;
        console.log('Is it loading ? ', isLoading);
        return (
            <div data-focus='autocomplete'>
                <div className={`mdl-textfield mdl-js-textfield${customError ? ' is-invalid' : ''}`} data-focus='input-text' ref='inputText'>
                    <div data-focus='loading' data-loading={isLoading} className='mdl-progress mdl-js-progress mdl-progress__indeterminate' ref='loader'/>
                    <input
                        className='mdl-textfield__input'
                        {...inputProps}
                        onChange={_handleQueryChange}
                        onFocus={_handleQueryFocus}
                        onKeyUp={_handleQueryKeyUp}
                        ref='htmlInput'
                        value={inputValue}
                    />
                    <label className='mdl-textfield__label'>{this.i18n(placeholder)}</label>
                    <span className='mdl-textfield__error'>{customError}</span>
                </div>
                {renderOptions ? renderOptions.call(this) : this._renderOptions()}
            </div>
        );
    }
}

export default Autocomplete;
