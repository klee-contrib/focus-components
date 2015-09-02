//Dependencies.
//https://github.com/skratchdot/react-bootstrap-daterangepicker
const {builder, types} = require('focus').component;
const React = require('react');
const InputText = require('../text').component;
//let assign = require('object-assign'); /// TODO TGN : do we keep this ?
const moment = require('moment');
const DateRangePicker = require('react-bootstrap-daterangepicker');
/**
* Input text mixin.
* @type {Object}
*/
const inputDateMixin = {
    /**
    * Tag name.
    */
    displayName: 'InputDate',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            value: moment(),
            drops: 'down', // possible values: up, down
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Appliquer',
                cancelLabel: 'Abandonner',
                fromLabel: 'De',
                toLabel: 'à',
                customRangeLabel: 'Personnalisée',
                daysOfWeek: [
                    'Di',
                    'Lu',
                    'Ma',
                    'Me',
                    'Je',
                    'Ve',
                    'Sa'
                ],
                monthNames: [
                    'Janvier',
                    'Février',
                    'Mars',
                    'Avril',
                    'Mai',
                    'Juin',
                    'Juillet',
                    'Août',
                    'Septembre',
                    'Octobre',
                    'Novembre',
                    'Décembre'
                ],
                firstDay: 1
            },
            showDropdowns: true,
            singleDatePicker: true
        };
    },
    /** @inheritdoc */
    propTypes: {
        error: types('string'),
        name: types('string'),
        value: types('object'),
        placeHolder: types('string'),
        startDate: types('string'),
        endDate: types('string'),
        drops: types('string'),
        showDropdowns: types('bool'),
        singleDatePicker: types('bool'),
        locale: types('object')
    },
    /** @inheritdoc */
    getInitialState() {
        return {
            value: this.props.value,
        };
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
        return this.state.value;
    },
    /**
     * Get formatted value.
     * @return {string} formattedValue
     */
    getFormattedValue() {
        //TODO TGN apply focus domain format.
        return moment(this.state.value).format(this.props.locale.format);
    },
    /** @inheritdoc */
    render() {
        const {value} = this.state;
        const {drops, error, locale, name, placeHolder, showDropdowns, singleDatePicker} = this.props;
        const formattedValue = this.getFormattedValue();
        return (
            <div data-focus="input-date">
            <DateRangePicker autoApply='true' drops={drops} locale={locale} onEvent={this.handleEvent} opens='center' showDropdowns={showDropdowns} singleDatePicker={singleDatePicker} startDate={value}>
                <InputText error={error} name={name} placeHolder={placeHolder} ref="inputDateText" value={formattedValue} />
            </DateRangePicker>
            </div>
        );
    }
};

module.exports = builder(inputDateMixin);
