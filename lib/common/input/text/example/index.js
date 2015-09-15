"use strict";

var InputText = FocusComponents.common.input.text.component;

var InputTextSample = React.createClass({
    displayName: "InputTextSample",

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        var _this = this;

        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Without value"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(InputText, { placeHolder: "Put your value here..." })
            ),
            React.createElement(
                "h3",
                null,
                "With value"
            ),
            React.createElement(InputText, { value: "Lorem Ipsum" }),
            React.createElement(
                "h3",
                null,
                "Input with error"
            ),
            React.createElement(InputText, { value: "Lorem Ipsum", error: "Hey! you've done someting wrong!" }),
            React.createElement(
                "h3",
                null,
                "Get the value"
            ),
            React.createElement(InputText, { value: "Lorem Ipsum", ref: "myInputText" }),
            React.createElement(
                "button",
                { onClick: function () {
                        alert(_this.refs.myInputText.getValue());
                    } },
                "Get the input value"
            )
        );
    }
});

return React.createElement(InputTextSample, null);