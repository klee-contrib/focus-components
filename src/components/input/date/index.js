// Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import moment from 'moment';
import DatePicker from './react-date-picker';
import isArray from 'lodash/lang/isArray';
import uniqueId from 'lodash/utility/uniqueId';
import closest from 'closest';

import Base from '../../../behaviours/component-base';
import InputText from '../text';

const isISOString = value => moment.utc(value, moment.ISO_8601, true).isValid();

const propTypes = {
    beforeValueGetter: PropTypes.func.isRequired,
    checkOnlyOnBlur: PropTypes.bool,
    triggerOnChangeIfEmpty: PropTypes.bool,
    drops: PropTypes.oneOf(['up', 'down']).isRequired,
    error: PropTypes.string,
    locale: PropTypes.string.isRequired,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showDropdowns: PropTypes.bool.isRequired,
    validate: PropTypes.func,
    value: (props, propName, componentName) => {
        const prop = props[propName];
        if (prop && !isISOString(prop)) {
            throw new Error(`The date ${prop} provided to the component ${componentName} is not an ISO date. Please provide a valid date string.`);
        }
    }
};

const defaultProps = {
    beforeValueGetter: value => value,
    checkOnlyOnBlur: false,
    triggerOnChangeIfEmpty: true,
    drops: 'down',
    format: 'MM/DD/YYYY',
    locale: 'en',
    /**
    * Default onChange prop, that will log an error.
    */
    onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },
    showDropdowns: true,
    validate: isISOString
};

/**
 * Date input component with text input and date picker.
 * Validate user input at each change in the text input.
 */
@Base
class InputDate extends Component {

    /**
     * Create a new component.
     * @param {*} props Props.
     */
    constructor(props) {
        super(props);

        const { value } = props;

        const state = {
            dropDownDate: isISOString(value) ? moment.utc(value, moment.ISO_8601) : moment.utc(),
            inputDate: this._formatDate(value),
            displayPicker: false
        };
        this.state = state;

        this._inputDateId = uniqueId('input-date-');
    }

    /**
     * Before component mount.
     */
    componentWillMount() {
        document.addEventListener('click', this._onDocumentClick);
    }

    /**
     * Receive component props.
     * @param {*} param0 
     */
    componentWillReceiveProps({ value }) {
        this.setState({
            dropDownDate: isISOString(value) ? moment.utc(value, moment.ISO_8601) : moment.utc(),
            inputDate: this._formatDate(value)
        });
    }

    /**
     * Before component unmount.
     */
    componentWillUnmount() {
        document.removeEventListener('click', this._onDocumentClick);
    }

    /**
     * Check if input value is a valid date.
     */
    _isInputFormatCorrect = value => this._parseInputDate(value).isValid();

    /**
     * Parse input value and try converting it to date.
     * Formats could be defined with the format props.
     * The default format is 'MM/DD/YYYY'.
     */
    _parseInputDate = inputDate => {
        const { format } = this.props;
        return moment.utc(inputDate, format, true);
    };

    /**
     * Format the date to the first format in the format props (if array). 
     * The default format is 'MM/DD/YYYY'.
     */
    _formatDate = isoDate => {
        let { format } = this.props;
        if (isISOString(isoDate)) {
            if (isArray(format)) {
                format = format[0];
            }
            return moment.utc(isoDate, moment.ISO_8601).format(format);
        } else {
            return isoDate;
        }
    };

    /**
     * Handle changes.
     */
    _onInputChange = (inputDate, fromBlur) => {
        let { checkOnlyOnBlur, triggerOnChangeIfEmpty } = this.props;
        // When checkOnlyOnBlur is true skip all checks.
        if (checkOnlyOnBlur === true && fromBlur !== true) {
            // Use case : incompatibles date formats (DD/MM/YY, DD/MM/YYYY)
            this.setState({ inputDate });
            return;
        }

        const isCorrect = this._isInputFormatCorrect(inputDate);
        const dropDownDate = isCorrect ? this._parseInputDate(inputDate) : null;
        const shouldTriggerChange = isCorrect || (triggerOnChangeIfEmpty && (inputDate || '').trim() === ''); // Fire onChange event, only if date if correct, or empty, if the option is activated
        const newData = isCorrect ? dropDownDate.toISOString() : null; // if date is not correct, it is empty, so send null (or empty string ?)

        if (isCorrect) {
            this.setState({ dropDownDate, inputDate });
        } else {
            this.setState({ inputDate });
        }

        // When checkOnlyOnBlur is true skip all checks.
        if (checkOnlyOnBlur === true) {
            if (shouldTriggerChange) {
                this.props.onChange(newData);
            }
            return;
        }

        // Fire onChange event, only if date if correct, or empty, if the option is activated
        if (fromBlur !== true && shouldTriggerChange) {
            this.props.onChange(newData);
        }
    };

    /**
     * Handle input text blur.
     */
    _onInputBlur = () => {
        const { inputDate } = this.state;
        this._onInputChange(inputDate, true);
    };

    /**
     * Handle calendar changes.
     * @memberOf InputDate
     */
    _onDropDownChange = (text, date) => {
        if (date._isValid) {
            this.setState({ displayPicker: false }, () => {
                const correctedDate = moment.utc(date).add(moment(date).utcOffset(), 'minutes').toISOString(); // Add UTC offset to get right ISO string
                this.props.onChange(correctedDate);
                this._onInputChange(this._formatDate(correctedDate), true);
            });
        }
    };

    /**
     * Handle input text focus.
     */
    _onInputFocus = () => {
        this.setState({ displayPicker: true });
    };

    /**
     * Handle document click to close the calendar.
     * @memberOf InputDate
     */
    _onDocumentClick = ({ target }) => {
        const targetClassAttr = target.getAttribute('class');
        const isTriggeredFromPicker = targetClassAttr ? targetClassAttr.includes('dp-cell') : false; //this is the only way to check the target comes from picker cause at this stage, month and year div are unmounted by React.

        // We do not trigger the setState, or the inputBlur if the picker was not displayed
        if (!isTriggeredFromPicker && this.state.displayPicker && closest(target, `[data-id='${this._inputDateId}']`, true) === undefined) {
            //if target was not triggered inside the date picker, we check it was not triggered by the input
            this.setState({ displayPicker: false }, () => this._onInputBlur());
        }
    };

    /**
     * Handle Tab and Enter keys to close the calendar.
     */
    _handleKeyDown = ({ key }) => {
        if (key === 'Tab' || key === 'Enter') {
            this.setState({ displayPicker: false }, () => this._onInputBlur());
        }
    };

    /**
     * Return value in a valid date format.
     */
    getValue = () => {
        const { inputDate } = this.state;
        const rawValue = this._isInputFormatCorrect(inputDate) ? this._parseInputDate(inputDate).toISOString() : null;

        return this.props.beforeValueGetter(rawValue);
    };

    /**
     * Validate the input.
     */
    validate = () => {
        const { inputDate } = this.state;
        const { isRequired } = this.props;
        if ('' === inputDate || !inputDate) {
            return ({
                isValid: !isRequired,
                message: 'field.required'
            });
        } else {
            return ({
                isValid: this._isInputFormatCorrect(inputDate),
                message: this.i18n('input.date.invalid', { date: inputDate })
            });
        }
    };

    /**
     * Render text input and datepicker.
     */
    render() {
        const { error, locale, name, placeholder, disabled, minDate, maxDate } = this.props;
        const { dropDownDate, inputDate, displayPicker } = this.state;
        const { _onInputBlur, _onInputChange, _onInputFocus, _onDropDownChange, _onPickerCloserClick, _handleKeyDown } = this;
        const inputProps = { disabled };

        return (
            <div data-focus='input-date' data-id={this._inputDateId}>
                <InputText error={error} name={name} onChange={_onInputChange} onKeyDown={_handleKeyDown} onFocus={_onInputFocus} placeholder={placeholder} ref='input' value={inputDate} {...inputProps} />
                {displayPicker &&
                    <div data-focus='picker-zone'>
                        <DatePicker
                            date={dropDownDate}
                            hideFooter
                            locale={locale}
                            onChange={_onDropDownChange}
                            ref='picker'
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                }
            </div>
        );
    }
}

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

export default InputDate;
