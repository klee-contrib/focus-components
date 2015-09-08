// Components

'use strict';

var InputDate = FocusComponents.common.input.date.component;
var Button = FocusComponents.common.button.action.component;

// Definition of moment's locale.
moment.locale('en');

var datePickerFrenchLocale = {
    format: 'll',
    separator: ' - ',
    applyLabel: 'Appliquer',
    cancelLabel: 'Abandonner',
    fromLabel: 'De',
    toLabel: 'à',
    customRangeLabel: 'Personnalisé',
    daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    firstDay: 1
};

var InputDateSample = React.createClass({
    displayName: 'InputDateSample',

    _handleGetValueClick: function _handleGetValueClick() {
        var value = moment(this.refs.myInputDate.getValue());
        alert(value);
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Without value'
            ),
            React.createElement(InputDate, { name: 'fieldDate1', value: undefined }),
            React.createElement(
                'h3',
                null,
                'With value'
            ),
            React.createElement(InputDate, { name: 'fieldDate2', value: new Date().toISOString() }),
            React.createElement(
                'h3',
                null,
                'Define a different locale (and formatter)'
            ),
            React.createElement(InputDate, { name: 'fieldDate3', locale: datePickerFrenchLocale, value: new Date().toISOString() }),
            React.createElement(
                'h3',
                null,
                'Get the value'
            ),
            React.createElement(InputDate, { name: 'fieldDate4', value: new Date().toISOString(), ref: 'myInputDate' }),
            React.createElement(Button, { handleOnClick: this._handleGetValueClick, label: 'Display value' })
        );
    }
});

return React.createElement(InputDateSample, null);