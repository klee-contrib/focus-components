// Dependencies

import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Base from '../../../behaviours/component-base';
import InputText from '../text';
import DatePicker from 'react-date-picker';
import {compose} from 'lodash/function';
import {isArray} from 'lodash/lang';

const isISOString = value => moment(value, moment.ISO_8601).isValid();

const propTypes = {
    drops: PropTypes.oneOf(['up', 'down']).isRequired,
    error: PropTypes.string,
    locale: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired,
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
    }

    componentWillMount = () => {
        moment.locale(this.props.locale);
        document.addEventListener('click', this._onDocumentClick);
    }


    componentDidMount = () => {
        const {drops, showDropdowns} = this.props;
        const {inputDate: startDate} = this.state;
    }

    componentWillReceiveProps = ({value}) => {
        this.setState({
            dropDownDate: isISOString(value) ? moment(value, moment.ISO_8601) : moment(),
            inputDate: this._formatDate(value)
        });
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this._onDocumentClick);
    }

    _isInputFormatCorrect = value => this._parseInputDate(value).isValid();

    _parseInputDate = inputDate => {
        const {format} = this.props;
        return moment(inputDate, format);
    }

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
    }

    _onInputChange = inputDate => {
        if (this._isInputFormatCorrect(inputDate)) {
            const dropDownDate = this._parseInputDate(inputDate);
            this.setState({dropDownDate, inputDate});
        } else {
            this.setState({inputDate});
        }
    }

    _onInputBlur = () => {
        const {inputDate} = this.state;
        if (this._isInputFormatCorrect(inputDate)) {
            this.props.onChange(this._parseInputDate(inputDate).toISOString());
        } else {
            this.props.onChange(inputDate);
        }
    }

    _onDropDownChange = (text, date) => {
        if (date._isValid) {
            this.setState({displayPicker: false}, () => {
                this._onInputChange(this._formatDate(date.toISOString())); // Add 12 hours to avoid skipping a day due to different locales
            });
        }
    }

    _onInputFocus = () => {
        this.setState({displayPicker: true});
    }

    _onDocumentClick = ({target}) => {
        const dataset = target ? target.dataset: null;
        const reactid = dataset ? dataset.reactid : null;
        const [picker, input] = ['picker', 'input'].map(ref => ReactDOM.findDOMNode(this.refs[ref]));
        const pickerId = picker ? picker.dataset.reactid : null;
        const inputId = input ? input.dataset.reactid : null;
        if (reactid && pickerId && inputId && !reactid.startsWith(pickerId) && !reactid.startsWith(inputId)) {
            this.setState({displayPicker: false});
        }
    }

    getValue = () => {
        const {inputDate} = this.state;
        return this._isInputFormatCorrect(inputDate) ? this._parseInputDate(inputDate).toISOString() : null;
    }

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
    }

    render() {
        const {error, locale, name, placeHolder} = this.props;
        const {dropDownDate, inputDate, displayPicker} = this.state;
        const {_onInputBlur, _onInputChange, _onInputFocus, _onDropDownChange, _onPickerCloserClick} = this;
        return (
            <div data-focus='input-date'>
                <InputText error={error} name={name} onBlur={_onInputBlur} onChange={_onInputChange} onFocus={_onInputFocus} placeHolder={placeHolder} ref='input' value={inputDate} />
                {displayPicker &&
                    <div data-focus='picker-zone'>
                        <DatePicker
                            date={dropDownDate}
                            hideFooter={true}
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
