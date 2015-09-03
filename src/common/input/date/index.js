//Dependencies.
//https://github.com/skratchdot/react-bootstrap-daterangepicker
const {builder, types} = require('focus').component;
const React = require('react');
const InputText = require('../text').component;
const moment = require('moment');
const DateRangePicker = require('react-bootstrap-daterangepicker');

const defaultLocale = {
    format: 'L', //cf mo moment.js documentation for further date format
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
    ],
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    firstDay: 1
};

/**
* Input text mixin.
* @type {Object}
*/
const InputDateMixin = {
    /**
    * Tag name.
    */
    displayName: 'InputDate',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            drops: 'down', // possible values: up, down
            showDropdowns: true,
            locale: defaultLocale
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
    /** @inheritdoc */
    getInitialState() {
        return {
            value: this.props.value
        };
    },
    /** @inheritdoc */
    componentWillReceiveProps(newProps){
        this.setState({
            value: newProps.value
        });
    },
    /**
    * Action when selection date event.
    * @param  {event} event
    * @param  {picker} picker date values
    */
    _onApply(event, picker){
        if(picker.startDate.isValid) {
            this.setState({
                value: picker.startDate
            });
        }
        React.findDOMNode(this.refs.inputDateText).focus();
    },
    // onShow(event){
    //     if(this.state.value) {
    //         const mdate = moment(this.state.value);
    //         console.debug(mdate);
    //         this.refs.daterangepicker.startDate = mdate;
    //     }
    // },
    /**
    * Get the selected date.
    * @return {object} selected date
    */
    getValue() {
        return this.state.value.toISOString();
    },
    /**
    * Get formatted value.
    * @return {string} formattedValue
    */
    getFormattedValue(calendarValue) {
        if(this.state.value){
            return calendarValue.format(this.props.locale.format);
        }
        return null;
    },
    _onInputChange(event) {
        const {value} = event.target;
        this.setState({value});
    },
    /** @inheritdoc */
    render() {
        const {value = moment()} = this.state;
        const calendarValue = moment(value);
        const {drops, error, locale, name, placeHolder, showDropdowns} = this.props;
        const formattedValue = calendarValue.isValid ? this.getFormattedValue(calendarValue) : value;
        const {_onInputChange, _onApply} = this;
        return (
            <div data-focus='input-date'>
            <DateRangePicker drops={drops} locale={locale} onApply={_onApply} opens='center' ref="daterangepicker" showDropdowns={showDropdowns} singleDatePicker={true} startDate={calendarValue}>
                <InputText error={error} name={name} onChange={_onInputChange} placeHolder={placeHolder} ref="inputDateText" value={formattedValue} />
            </DateRangePicker>
            </div>
        );
    }
};

module.exports = builder(InputDateMixin);
