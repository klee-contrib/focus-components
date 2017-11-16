import React, { Component, PropTypes } from 'react';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';
import closest from 'closest';
import debounce from 'lodash/function/debounce';
import uniqueId from 'lodash/utility/uniqueId';

const ENTER_KEY_CODE = 13;
const TAB_KEY_CODE = 27;
const UP_ARROW_KEY_CODE = 38;
const DOWN_ARROW_KEY_CODE = 40;

const propTypes = {
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
    value: PropTypes.string,
    onSelectClear: PropTypes.bool,
    clearOnNullValue: PropTypes.bool
};

const defaultProps = {
    keyName: 'key',
    labelName: 'label',
    inputTimeout: 200,
    onSelectClear: false,
    clearOnNullValue: true
};

@MDBehaviour('loader')
@MDBehaviour('inputText')
@ComponentBaseBehaviour
class Autocomplete extends Component {

    constructor(props) {
        super(props);

        const state = {
            focus: false,
            inputValue: this.props.value,
            options: new Map(),
            active: null,
            selected: this.props.value,
            fromKeyResolver: false,
            isLoading: false,
            customError: this.props.customError,
            totalCount: 0
        };

        this.state = state;
        this.autocompleteId = uniqueId('autocomplete-text-');
    }

    componentDidMount() {
        const { value, keyResolver, inputTimeout } = this.props;

        if (value !== undefined && value !== null) { // value is defined, call the keyResolver to get the associated label
            keyResolver(value).then(inputValue => {
                this.setState({ inputValue, fromKeyResolver: true });
            }).catch(error => this.setState({ customError: error.message }));
        }

        document.addEventListener('click', this._handleDocumentClick);
        this._debouncedQuerySearcher = debounce(this._querySearcher, inputTimeout);
    }

    componentWillReceiveProps({ value, customError, error, keyResolver }) {
        if (value !== this.props.value && value !== undefined && value !== null) { // value is defined, call the keyResolver to get the associated label
            this.setState({ inputValue: value, customError }, () => keyResolver(value).then(inputValue => {
                this.setState({ inputValue, fromKeyResolver: true });
            }).catch(error => this.setState({ customError: error.message })));
        } else if (customError !== this.props.customError) {
            this.setState({ customError });
        }

        if (error) {
            this.setState({ customError: error });
        }

        if (this.props.clearOnNullValue && this.props.clearOnNullValue === true && value === null && this.state.inputValue !== null) {
            this.setState({ inputValue: '' });
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
        const { labelName, keyName, value } = this.props;
        const { inputValue, selected, options, fromKeyResolver } = this.state;
        const resolvedLabel = options.get(selected);
        if (inputValue === '') { // The user cleared the field, return a null
            return null;
        } else if (fromKeyResolver) { // Value was received from the keyResolver, give it firectly
            return value;
        } else if (resolvedLabel !== inputValue && selected !== inputValue) { // The user typed something without selecting any option, return a null
            return null;
        } else { // The user selected an option (or no value was provided), return it
            return selected || null;
        }
    }

    _handleDocumentClick = ({ target }) => {
        const { focus, inputValue } = this.state;
        const { onBadInput } = this.props;
        if (focus) {
            const closestACParent = closest(target, `[data-id='${this.autocompleteId}']`, true);
            if (closestACParent === undefined) {
                this.setState({ focus: false }, () => {
                    if (onBadInput && this.getValue() === null && inputValue !== '') {
                        onBadInput(inputValue);
                    }
                });
            }
        }
    };

    _handleQueryChange = ({ target: { value } }) => {
        if (value === '') { // the user cleared the input, don't call the querySearcher
            const { onChange } = this.props;
            this.setState({ inputValue: value, fromKeyResolver: false });
            if (onChange) onChange(null);
        } else {
            this.setState({ inputValue: value, fromKeyResolver: false, isLoading: true });
            this._debouncedQuerySearcher(value);
        }
    };

    _querySearcher = value => {
        const { querySearcher, keyName, labelName } = this.props;
        querySearcher(value).then(({ data, totalCount }) => {
            // TODO handle the incomplete option list case
            const options = new Map();
            data.forEach(item => {
                options.set(item[keyName], item[labelName]);
            });
            this.setState({ options, isLoading: false, totalCount });
        }).catch(error => this.setState({ customError: error.message }));
    };

    _handleQueryFocus = () => {
        this.refs.options.scrollTop = 0;
        if (this.props.onFocus) {
            this.props.onFocus.call(this);
        }
        this.setState({ active: '', focus: true });
    };

    _handleQueryKeyDown = (event) => {
        event.stopPropagation();
        const { which } = event;
        const { active, options } = this.state;
        if (which === ENTER_KEY_CODE && active) {
            this._select(active);
        }
        if (which === TAB_KEY_CODE) {
            this.setState({ focus: false }, () => this.refs.htmlInput.blur());
        }
        if ([DOWN_ARROW_KEY_CODE, UP_ARROW_KEY_CODE].indexOf(which) !== -1) { // the user pressed on an arrow key, change the active key
            const optionKeys = [];
            for (let key of options.keys()) {
                optionKeys.push(key);
            }
            const currentIndex = optionKeys.indexOf(active);
            let newIndex = currentIndex + (which === DOWN_ARROW_KEY_CODE ? 1 : -1);
            if (newIndex >= options.size) {
                newIndex -= options.size
            }
            if (newIndex < 0) {
                newIndex += options.size;
            }
            this.setState({ active: optionKeys[newIndex] });
        }
    };

    _handleSuggestionHover = key => {
        this.setState({ active: key });
    };

    _select(key) {
        const { options } = this.state;
        const { onChange } = this.props;
        const resolvedLabel = options.get(key) || '';
        this.refs.htmlInput.blur();
        let newState = { inputValue: this.i18n(resolvedLabel), selected: key, focus: false };
        if (this.props.onSelectClear === true) {
            newState = { inputValue: '', selected: null, focus: false };
        }
        this.setState(newState, () => {
            if (onChange) {
                onChange(key);
            }
        });
    }

    _renderOptions = () => {
        const { active, options, focus } = this.state;
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
    };

    render() {
        const { inputValue, isLoading } = this.state;
        const { customError, renderOptions } = this.props;

        const validInputProps = filterProps(this.props);

        const { placeholder } = validInputProps;

        validInputProps.value = inputValue;
        validInputProps.onFocus = this._handleQueryFocus;
        validInputProps.onKeyDown = this._handleQueryKeyDown;
        validInputProps.onChange = this._handleQueryChange;

        const inputProps = { ...validInputProps };

        return (
            <div data-focus='autocomplete' data-id={this.autocompleteId}>
                <div className={`mdl-textfield mdl-js-textfield${customError ? ' is-invalid' : ''}`} data-focus='input-text' ref='inputText'>
                    <div data-focus='loading' data-loading={isLoading} className='mdl-progress mdl-js-progress mdl-progress__indeterminate' ref='loader' />
                    <input
                        className='mdl-textfield__input'
                        {...inputProps}
                        ref='htmlInput'
                        type='text'
                        autoComplete='off'
                    />
                    <label className='mdl-textfield__label'>{this.i18n(placeholder)}</label>
                    <span className='mdl-textfield__error'>{this.i18n(customError)}</span>
                </div>
                {renderOptions ? renderOptions.call(this) : this._renderOptions()}
            </div>
        );
    }
}

Autocomplete.displayName = 'Autocomplete';
Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

export default Autocomplete;
