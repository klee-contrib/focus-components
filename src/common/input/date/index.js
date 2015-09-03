//Dependencies.
//https://github.com/skratchdot/react-bootstrap-daterangepicker
const {builder, types} = require('focus').component;
const React = require('react');
const InputText = require('../text').component;
const moment = require('moment');
const DateRangePicker = require('react-bootstrap-daterangepicker');

const defaultLocale = {
    format: 'MM/DD/YYYY',
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

// const defaultLocale = {
//     format: 'DD/MM/YYYY',
//     separator: ' - ',
//     applyLabel: 'Appliquer',
//     cancelLabel: 'Abandonner',
//     fromLabel: 'De',
//     toLabel: 'à',
//     customRangeLabel: 'Personnalisée',
//     daysOfWeek: [
//         'Di',
//         'Lu',
//         'Ma',
//         'Me',
//         'Je',
//         'Ve',
//         'Sa'
//     ],
//     monthNames: [
//         'Janvier',
//         'Février',
//         'Mars',
//         'Avril',
//         'Mai',
//         'Juin',
//         'Juillet',
//         'Août',
//         'Septembre',
//         'Octobre',
//         'Novembre',
//         'Décembre'
//     ],
//     firstDay: 1
// };

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
            value: moment(this.props.value)
        };
    },
    /** @inheritdoc */
    componentWillReceiveProps(newProps){
        if(newProps !== undefined){
            this.setState({
                value: moment(newProps.value)
            });
        }
    },
    /**
    * Action when selection date event.
    * @param  {event} event
    * @param  {picker} picker date values
    */
    handleEvent(event, picker){
        this.setState({
            value: picker.startDate
        });
        //React.findDOMNode(this.refs.inputDateText).focus();
    },
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
    getFormattedValue() {
        return moment(this.state.value).format(this.props.locale.format);
    },
    /** @inheritdoc */
    render() {
        const {value} = this.state;
        const {drops, error, locale, name, placeHolder, showDropdowns} = this.props;
        const formattedValue = this.getFormattedValue();
        return (
            <div data-focus='input-date'>
            <DateRangePicker autoApply='true' drops={drops} locale={locale} onEvent={this.handleEvent} opens='center' showDropdowns={showDropdowns} singleDatePicker={true} startDate={value}>
            <InputText error={error} name={name} placeHolder={placeHolder} ref="inputDateText" value={formattedValue} />
            </DateRangePicker>
            </div>
        );
    }
};

module.exports = builder(InputDateMixin);
