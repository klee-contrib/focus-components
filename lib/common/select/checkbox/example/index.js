"use strict";

var SelectCheckbox = FocusComponents.common.select.checkbox.component;

var SelectCheckboxSample = React.createClass({
    displayName: "SelectCheckboxSample",

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick: function handleGetValueClick() {
        var values = this.refs.mySelectCheckbox.getValues();
        alert('Selected values IDs: ' + values);
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
                "List of checkboxes"
            ),
            React.createElement(SelectCheckbox, {
                values: [{ value: "A", label: "Value A" }, { value: "B", label: "Value B" }, { value: "C", label: "Value C" }, { value: "D", label: "Value D" }], ref: "mySelectCheckbox" }),
            React.createElement(
                "h3",
                null,
                "List of checkboxes with preselected values"
            ),
            React.createElement(SelectCheckbox, {
                value: ["B"],
                values: [{ value: "A", label: "Value A" }, { value: "B", label: "Value B" }, { value: "C", label: "Value C" }, { value: "D", label: "Value D" }], ref: "mySelectCheckbox" }),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: this.handleGetValueClick },
                "Get the selected values"
            )
        );
    }
});

return React.createElement(SelectCheckboxSample, null);