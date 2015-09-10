"use strict";

var Header = FocusComponents.application.header.component;
var HeaderExample = React.createClass({
    displayName: "HeaderExample",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                Header,
                null,
                React.createElement(
                    "div",
                    { className: "mdl-layout__header-row" },
                    React.createElement(
                        "span",
                        { className: "mdl-layout-title" },
                        "Title"
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "nav",
                        { className: "mdl-navigation" },
                        React.createElement(
                            "a",
                            { className: "mdl-navigation__link", href: "" },
                            "Link"
                        ),
                        React.createElement(
                            "a",
                            { className: "mdl-navigation__link", href: "" },
                            "Link"
                        ),
                        React.createElement(
                            "a",
                            { className: "mdl-navigation__link", href: "" },
                            "Link"
                        ),
                        React.createElement(
                            "a",
                            { className: "mdl-navigation__link", href: "" },
                            "Link"
                        )
                    )
                )
            ),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" })
        );
    }
});

return React.createElement(HeaderExample, null);