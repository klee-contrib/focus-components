// Components
"use strict";

var Checkbox = FocusComponents.common.input.checkbox.component;

var InputCheckboxSample = React.createClass({
    displayName: "InputCheckboxSample",

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick: function handleGetValueClick() {
        var value = this.refs.cbTestGetValue.getValue();
        alert('Checkbox value: ' + value);
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
                "Input checkbox"
            ),
            React.createElement(Checkbox, { value: true, label: "My awsome checkbox" }),
            React.createElement(
                "h3",
                null,
                "Unselected checkbox"
            ),
            React.createElement(Checkbox, { value: false, label: "My awsome checkbox" }),
            React.createElement(
                "h3",
                null,
                "Without label"
            ),
            React.createElement(Checkbox, { value: true }),
            React.createElement(
                "h3",
                null,
                "Get Checkbox value"
            ),
            React.createElement(
                "div",
                { style: { float: 'left', width: '300px' } },
                React.createElement(Checkbox, { value: true, label: "My awsome checkbox", ref: "cbTestGetValue" })
            ),
            React.createElement(
                "div",
                { style: { marginLeft: '300px' } },
                React.createElement(
                    "button",
                    { onClick: this.handleGetValueClick },
                    "Get the checkbox value"
                )
            )
        );
    }
});

return React.createElement(InputCheckboxSample, null);