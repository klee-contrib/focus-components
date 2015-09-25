// Dependencies.

'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var moment = require('moment');

// Components

var InputText = require('../text').component;
var DateRangePicker = require('react-bootstrap-daterangepicker'); //https://github.com/skratchdot/react-bootstrap-daterangepicker

var defaultLocale = {
    format: 'L', //cf mo moment.js documentation for further date format
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    firstDay: 1
};

/**
* Input text mixin.
* @type {Object}
*/
var InputDateMixin = {
    /**
    * Tag name.
    */
    displayName: 'InputDate',

    /**
    * Get default props
    * @return {object} default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            drops: 'down', // possible values: up, down
            showDropdowns: true,
            locale: defaultLocale,
            value: moment()
        };
    },
    /** @inheritdoc */
    propTypes: {
        drops: types('string'),
        error: types('string'),
        formatter: types('func'),
        locale: types('object').isRequired,
        name: types('string').isRequired,
        placeHolder: types('string'),
        value: types('object').isRequired
    },
    /**
    * Get initial state
    * @return {object} initial state
    */
    getInitialState: function getInitialState() {
        var value = this.props.value;

        var momentValue = moment(value);
        var rawDate = momentValue.isValid ? value : null;
        var inputDate = momentValue.isValid ? this.getFormattedDate(value) : '';
        return { inputDate: inputDate, rawDate: rawDate };
    },
    /**
    * New props handler
    * @param  {object} value new value given as a prop
    */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var value = _ref.value;

        var momentValue = moment(value);
        var rawDate = momentValue.isValid ? value : null;
        var inputDate = momentValue.isValid ? this.getFormattedDate(value) : '';
        this.setState({ inputDate: inputDate, rawDate: rawDate });
    },
    /**
    * Get the selected date.
    * @return {object} selected date
    */
    getValue: function getValue() {
        var _state = this.state;
        var inputDate = _state.inputDate;
        var rawDate = _state.rawDate;

        if (!inputDate) {
            return null;
        } else {
            return moment(rawDate).toISOString();
        }
    },
    /**
    * Get formatted value.
    * @param  {date} rawDate raw date
    * @return {string} formatted date
    */
    getFormattedDate: function getFormattedDate(rawDate) {
        if (rawDate) {
            var format = this.props.locale.format;

            return moment(rawDate).format(format);
        }
        return null;
    },
    /**
    * Action when selection date event.
    * @param  {event} event event triggered by the component
    * @param  {date} pickerDate date picker date value
    */
    _onPickerApply: function _onPickerApply(event, _ref2) {
        var pickerDate = _ref2.startDate;

        if (pickerDate._isValid) {
            this.setState({
                inputDate: this.getFormattedDate(moment(pickerDate).add(12, 'hours')),
                rawDate: pickerDate
            });
        }
    },
    /**
    * Input blur handler
    * @param  {object} inputDate input field value
    */
    _onInputBlur: function _onInputBlur(_ref3) {
        var inputDate = _ref3.target.value;

        if (moment(inputDate).isValid()) {
            this.setState({
                inputDate: inputDate,
                rawDate: moment(inputDate)
            });
        } else if ('' === inputDate) {
            this.setState({
                inputDate: null
            });
        } else {
            this.setState({
                inputDate: this.getFormattedDate()
            });
        }
    },
    /**
    * Input change handler
    * @param  {object} inputDate input field value
    */
    _onInputChange: function _onInputChange(_ref4) {
        var inputDate = _ref4.target.value;

        if (moment(inputDate).isValid()) {
            this.setState({ inputDate: inputDate, rawDate: inputDate });
        } else {
            this.setState({ inputDate: inputDate });
        }
    },
    /**
    * Render the component
    * @return {HTML} rendered component
    */
    render: function render() {
        var _state2 = this.state;
        var inputDate = _state2.inputDate;
        var rawDate = _state2.rawDate;
        var _props = this.props;
        var drops = _props.drops;
        var error = _props.error;
        var locale = _props.locale;
        var name = _props.name;
        var placeHolder = _props.placeHolder;
        var showDropdowns = _props.showDropdowns;
        var _onInputBlur = this._onInputBlur;
        var _onInputChange = this._onInputChange;
        var _onPickerApply = this._onPickerApply;

        var calendarDate = rawDate ? moment(rawDate) : moment();
        return React.createElement(
            'div',
            { 'data-focus': 'input-date' },
            React.createElement(
                DateRangePicker,
                { drops: drops, endDate: calendarDate, locale: locale, onApply: _onPickerApply, opens: 'center', ref: 'daterangepicker', showDropdowns: showDropdowns, singleDatePicker: true, startDate: calendarDate },
                React.createElement(InputText, { error: error, name: name, onBlur: _onInputBlur, onChange: _onInputChange, placeHolder: placeHolder, ref: 'inputDateText', value: inputDate })
            )
        );
    }
};

module.exports = builder(InputDateMixin);