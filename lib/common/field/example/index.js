'use strict';

var Field = FocusComponents.common.field.component;

var FieldSample = React.createClass({
    displayName: 'FieldSample',

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            'form',
            null,
            React.createElement(
                'h3',
                null,
                'Champ en mode consultation'
            ),
            React.createElement(Field, { name: 'fieldConsult', value: 'fieldConsultValue', isEdit: false, label: 'My awsome field' }),
            React.createElement(Field, { name: 'fieldConsultFormatted', value: 'fieldConsultValue', isEdit: false, formatter: function (data) {
                    return data + " formatter applied";
                }, label: 'My awsome field formatted' }),
            React.createElement(
                'h3',
                null,
                'Champ en mode édition'
            ),
            React.createElement(Field, { name: 'field1', value: 'fieldValue', isEdit: true }),
            React.createElement(
                'h3',
                null,
                'Champ en mode édition avec domaine'
            ),
            React.createElement(Field, { name: 'field1', value: 'fieldValue', isEdit: true, domain: 'DO_NOM' }),
            React.createElement(
                'h3',
                null,
                'Champ en erreur'
            ),
            React.createElement(Field, { name: 'field2', value: 'field2Value', error: 'error in field2', isEdit: true }),
            React.createElement(
                'h3',
                null,
                'Type number'
            ),
            React.createElement(Field, { name: 'field3', value: 3, type: 'number' }),
            React.createElement(Field, { name: 'field4', value: 'popop', isEdit: true, help: 'Here to help' }),
            React.createElement(
                'h3',
                null,
                'Disable'
            ),
            React.createElement(Field, { name: 'fieldDisabled', value: 'popop', isEdit: true, disabled: true })
        );
    }
});

return React.createElement(FieldSample, null);