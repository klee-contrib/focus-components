// Components

const InputDate = FocusComponents.common.input.date.component;
const Button = FocusComponents.common.button.action.component;

// Definition of moment's locale.
moment.locale('en');

const datePickerFrenchLocale = {
    format: 'll',
    separator: ' - ',
    applyLabel: 'Appliquer',
    cancelLabel: 'Abandonner',
    fromLabel: 'De',
    toLabel: 'à',
    customRangeLabel: 'Personnalisé',
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
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
    ],
    firstDay: 1
};

const InputDateSample = React.createClass({
    _handleGetValueClick() {
        const value = moment(this.refs.myInputDate.getValue());
        alert(value);
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Without value</h3>
                <InputDate name='fieldDate1' value={undefined} />

                <h3>With value</h3>
                <InputDate name='fieldDate2' value={new Date().toISOString()} />

                <h3>Define a different locale (and formatter)</h3>
                <InputDate name='fieldDate3' locale={datePickerFrenchLocale} value={new Date().toISOString()} />

                <h3>Get the value</h3>
                <InputDate name='fieldDate4' value={new Date().toISOString()} ref='myInputDate' />
                <Button handleOnClick={this._handleGetValueClick} label='Display value' />
            </div>
        );
    }
});

return <InputDateSample/>;
