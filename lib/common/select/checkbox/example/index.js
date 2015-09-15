"use strict";

var SelectCheckbox = FocusComponents.common.select.checkbox.component;
var _ref = _;
var pull = _ref.pull;

var possibleValues = [{ value: "A", label: "Value A" }, { value: "B", label: "Value B" }, { value: "C", label: "Value C" }, { value: "D", label: "Value D" }];

var SelectCheckboxSample = React.createClass({
    displayName: "SelectCheckboxSample",

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick: function handleGetValueClick() {
        var values = this.refs.mySelectCheckbox.getValue();
        alert('Selected values IDs: ' + values);
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            selectedValues: ['B']
        };
    },

    /**
    * Handle click action to get check value.
    */
    handleGetValueClick2: function handleGetValueClick2(key, newStatus) {
        var selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({ value: selectedValues });
        alert('Selected values IDs: ' + this.state.selectedValues);
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
                values: possibleValues, ref: "mySelectCheckbox" }),
            React.createElement(
                "h3",
                null,
                "List of checkboxes with preselected values"
            ),
            React.createElement(SelectCheckbox, {
                value: ['B'],
                values: possibleValues, ref: "mySelectCheckbox" }),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: this.handleGetValueClick },
                "Get the selected values"
            ),
            React.createElement(
                "h3",
                null,
                "Add OnChange event"
            ),
            React.createElement(SelectCheckbox, {
                value: this.state.selectedValues,
                values: possibleValues, ref: "mySelectCheckbox2", onChange: this.handleGetValueClick2 })
        );
    }
});

return React.createElement(SelectCheckboxSample, null);