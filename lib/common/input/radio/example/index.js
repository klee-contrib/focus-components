"use strict";

var InputRadio = FocusComponents.common.input.radio.component;

var InputRadioSample = React.createClass({
    displayName: "InputRadioSample",

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
                "With value : False"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(InputRadio, { name: "options1", value: false, label: "Value False" })
            ),
            React.createElement(
                "h3",
                null,
                "With value : True"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(InputRadio, { name: "options2", value: true, label: "Value True" })
            )
        );
    }
});

return React.createElement(InputRadioSample, null);