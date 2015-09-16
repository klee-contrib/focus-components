"use strict";

var SelectRadio = FocusComponents.common.select.radio.component;

var values = [{ code: "A", label: "Value A" }, { code: "B", label: "Value B" }, { code: "C", label: "Value C" }];

var SelectRadioSample = React.createClass({
    displayName: "SelectRadioSample",

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick: function handleGetValueClick() {
        var value = this.refs.mySelectRadio.getValue();
        alert('Selected values ID: ' + value);
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            value: 'A'
        };
    },

    /**
    * Handle click action to get check value.
    */
    handleOnChange: function handleOnChange(newValue) {
        this.setState({ value: newValue });
        alert('Selected values ID: ' + newValue);
    },

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Classic select radio"
            ),
            React.createElement(SelectRadio, {
                value: "B",
                values: values }),
            React.createElement(
                "h3",
                null,
                "Classic select radio"
            ),
            React.createElement(SelectRadio, {
                value: "B",
                values: values, ref: "mySelectRadio" }),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: this.handleGetValueClick },
                "Get the selected value"
            ),
            React.createElement(
                "h3",
                null,
                "OnChange event overload"
            ),
            React.createElement(SelectRadio, {
                value: this.state.value,
                values: values, onChange: this.handleOnChange })
        );
    }
});

return React.createElement(SelectRadioSample, null);