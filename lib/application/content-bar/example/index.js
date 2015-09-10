"use strict";

var ContentBar = FocusComponents.application.contentBar.component;
var ContentBarExample = React.createClass({
    displayName: "ContentBarExample",

    render: function render() {
        return React.createElement(
            ContentBar,
            null,
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" }),
            React.createElement("img", { src: "http://lorempixel.com/400/200" })
        );
    }
});

return React.createElement(ContentBarExample, null);