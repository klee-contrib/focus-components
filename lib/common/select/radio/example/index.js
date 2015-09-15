'use strict';

var SelectRadio = FocusComponents.common.select.radio.component;

var SelectRadioSample = React.createClass({
    displayName: 'SelectRadioSample',

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick: function handleGetValueClick() {
        var value = this.refs.mySelectRadio.getValue();
        alert('Selected values ID: ' + value);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(SelectRadio, {
                value: 'B',
                values: [{ value: "A", label: "Value A" }, { value: "B", label: "Value B" }, { value: "C", label: "Value C" }], ref: 'mySelectRadio' }),
            React.createElement('br', null),
            React.createElement(
                'button',
                { onClick: this.handleGetValueClick },
                'Get the selected value'
            )
        );
    }
});

return React.createElement(SelectRadioSample, null);