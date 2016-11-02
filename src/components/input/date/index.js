// Dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Base from '../../../behaviours/component-base';
import InputText from '../text';
import DatePicker from 'react-date-picker';
import compose from 'lodash/function/compose';
import isArray from 'lodash/lang/isArray';
import uniqueId from 'lodash/utility/uniqueId';
import closest from 'closest';

const isISOString = value => moment(value, moment.ISO_8601).isValid();

const propTypes = {
    drops: PropTypes.oneOf(['up', 'down']).isRequired,
    error: PropTypes.string,
    locale: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    beforeValueGetter: PropTypes.func.isRequired,
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
    drops: 'down',
    locale: 'en',
    format: 'MM/DD/YYYY',
    beforeValueGetter: value => value,
    /**
    * Default onChange prop, that will log an error.
    */
    onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },
    showDropdowns: true,
    validate: isISOString
};

@Base
class InputDate extends Component {
    constructor(props) {
        super(props);
        const {value} = props;
        const state = {
            dropDownDate: isISOString(value) ? moment(value, moment.ISO_8601) : moment(),
            inputDate: this._formatDate(value),
            displayPicker: false
        };
        this.state = state;
        this._inputDateId = uniqueId('input-date-');
    }

    componentWillMount() {
        moment.locale(this.props.locale);
        document.addEventListener('click', this._onDocumentClick);
    }


    componentDidMount() {
        const {drops, showDropdowns} = this.props;
        const {inputDate: startDate} = this.state;
    }

    componentWillReceiveProps({value}) {
        this.setState({
            dropDownDate: isISOString(value) ? moment(value, moment.ISO_8601) : moment(),
            inputDate: this._formatDate(value)
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._onDocumentClick);
    }

    _isInputFormatCorrect = value => this._parseInputDate(value).isValid();

    _parseInputDate = inputDate => {
        const {format} = this.props;
        return moment(inputDate, format);
    };

    _formatDate = isoDate => {
        let {format} = this.props;
        if (isISOString(isoDate)) {
            if (isArray(format)) {
                format = format[0];
            }
            return moment(isoDate, moment.ISO_8601).format(format);
        } else {
            return isoDate;
        }
    };

    _onInputChange = (inputDate, fromBlur) => {
        if (this._isInputFormatCorrect(inputDate)) {
            const dropDownDate = this._parseInputDate(inputDate);
            this.setState({dropDownDate, inputDate});
        } else {
            this.setState({inputDate});
        }
        if(fromBlur !== true) {
            this.props.onChange(inputDate);
        }
    };

    _onInputBlur = () => {
        const {inputDate} = this.state;
        this._onInputChange(inputDate, true);
    };

    _onDropDownChange = (text, date) => {
        if (date._isValid) {
            this.setState({displayPicker: false}, () => {
                this.props.onChange(date.toISOString());
                this._onInputChange(this._formatDate(date.toISOString()), true) // Add 12 hours to avoid skipping a day due to different locales
            });
        }
    };

    _onInputFocus = () => {
        this.setState({displayPicker: true});
    };

    _onDocumentClick = ({target}) => {
        const targetClassAttr = target.getAttribute('class');
        const isTriggeredFromPicker = targetClassAttr ? targetClassAttr.includes('dp-cell') : false; //this is the only way to check the target comes from picker cause at this stage, month and year div are unmounted by React.
        if(!isTriggeredFromPicker) {
            //if target was not triggered inside the date picker, we check it was not triggered by the input
            if (closest(target, `[data-id='${this._inputDateId}']`, true) === undefined) {
                this.setState({displayPicker: false}, () => this._onInputBlur());
            }
        }
    };

    _handleKeyDown = ({key}) => {
        if (key === 'Tab' || key === 'Enter') {
            this.setState({displayPicker: false}, () => this._onInputBlur());
        }
    };

    getValue = () => {
        const {inputDate} = this.state;
        const rawValue = this._isInputFormatCorrect(inputDate) ? this._parseInputDate(inputDate).toISOString() : null;
        return this.props.beforeValueGetter(rawValue);
    };

    validate = () => {
        const {inputDate} = this.state;
        const {isRequired} = this.props;
        if ('' === inputDate || !inputDate) {
            return ({
                isValid: !isRequired,
                message: 'field.required'
            });
        } else {
            return ({
                isValid: this._isInputFormatCorrect(inputDate),
                message: this.i18n('input.date.invalid', {date: inputDate})
            });
        }
    };

    render() {
        const {error, locale, name, placeholder, disabled} = this.props;
        const {dropDownDate, inputDate, displayPicker} = this.state;
        const {_onInputBlur, _onInputChange, _onInputFocus, _onDropDownChange, _onPickerCloserClick, _handleKeyDown} = this;
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
