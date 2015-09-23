// Dependencies

import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Base from '../../../behaviours/component-base';
import defaultLocale from './default-locale';
import InputText from '../text';
import jQuery from 'jquery';
import DateRangePicker from 'daterangepicker'; //eslint-disable-line
import {compose} from 'lodash/function';

const isDateStringValid = compose(bool => !bool, isNaN, Date.parse);

const propTypes = {
    drops: PropTypes.oneOf(['up', 'down']).isRequired,
    error: PropTypes.string,
    formatter: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired,
    showDropdowns: PropTypes.bool.isRequired,
    validate: PropTypes.func,
    value: (props, propName, componentName) => {
        const prop = props[propName];
        if (prop && !isDateStringValid(prop)) {
            throw new Error(`The date (${prop}) is invalid for component ${componentName}. Please provide a valid date string.`);
        }
    }
};

const defaultProps = {
    drops: 'down',
    locale: defaultLocale,
    /**
     * Default onChange prop, that will log an error.
     */
    onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },
    showDropdowns: true,
    validate: isDateStringValid,
    value: moment()
};

@Base
class InputDate extends Component {
    constructor(props) {
        super(props);
        const {value} = props;
        const state = {
            dropDownDate: isDateStringValid(value) ? moment(Date.parse(value)) : moment(),
            inputDate: this._formatDate(value)
        };
        this.state = state;
    }

    componentWillReceiveProps = ({value}) => {
        if (value !== this.state.inputDate) {
            if (isDateStringValid(value)) {
                this.setState({
                    dropDownDate: moment(Date.parse(value)),
                    inputDate: this._formatDate(value)
                });
            } else {
                this.setState({inputDate: this._formatDate(value)});
            }
        }
    }

    componentDidMount = () => {
        const {drops, locale, showDropdowns} = this.props;
        const {inputDate: startDate} = this.state;
        jQuery(ReactDOM.findDOMNode(this.refs.input.refs.htmlInput)).daterangepicker({
            singleDatePicker: true,
            showDropdowns,
            drops,
            startDate,
            locale
        }, this._onDropDownChange);
    }

    componentDidUpdate = () => {
        const {inputDate} = this.state;
        if (isDateStringValid(inputDate)) {
            jQuery(ReactDOM.findDOMNode(this.refs.input.refs.htmlInput)).data('daterangepicker').setStartDate(Date.parse(inputDate));
        }
    }

    getValue = () => {
        const {dropDownDate, inputDate} = this.state;
        return isDateStringValid(inputDate) ? dropDownDate.toISOString() : null;
    }

    _formatDate = unformatedDate => {
        const {locale: {format}} = this.props;
        if (isDateStringValid(unformatedDate)) {
            return moment(Date.parse(unformatedDate)).format(format);
        } else {
            return unformatedDate;
        }
    }

    _onInputChange = inputDate => {
        if (isDateStringValid(inputDate)) {
            const dropDownDate = moment(Date.parse(inputDate));
            this.setState({dropDownDate, inputDate});
        } else {
            this.setState({inputDate});
        }
    }

    _onInputBlur = () => {
        this.props.onChange(this.state.inputDate);
    }

    _onDropDownChange = date => {
        if (date._isValid) {
            this._onInputChange(this._formatDate(moment(date).add(12, 'hours'))); // Add 12 hours to avoid skipping a day due to different locales
        }
    }

    validate = (inputDate = this.state.inputDate) => {
        const isValid = isDateStringValid(inputDate);
        return {
            isValid,
            message: isValid ? '' : `${inputDate} is not a valid date.`
        };
    }

    render() {
        const {error, name, placeHolder} = this.props;
        const {inputDate} = this.state;
        const {_onInputBlur, _onInputChange} = this;
        return (
            <div data-focus='input-date'>
                <InputText error={error} name={name} onBlur={_onInputBlur} onChange={_onInputChange} placeHolder={placeHolder} ref='input' value={inputDate} />
            </div>
        );
    }
}

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

export default InputDate;
