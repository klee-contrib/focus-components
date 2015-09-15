"use strict";

var Detail = FocusComponents.common.detail.component;
var Block = FocusComponents.common.block.component;

var DetailSample = React.createClass({
    displayName: "DetailSample",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Detail sample"
            ),
            React.createElement(
                Detail,
                null,
                React.createElement(
                    Block,
                    { title: "Sports" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/sports", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Animals" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/animals", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Business" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/business", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Cats" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/cats", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "City" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/city", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Food" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/food", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Nightlife" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/nightlife", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Fashion" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/fashion", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "People" },
                    React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/people", title: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Nature" },
                    React.createElement("img", { src: "http://lorempixel.com/800/600/nature", title: "lorempixel", alt: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Technics" },
                    React.createElement("img", { src: "http://lorempixel.com/800/600/technics", title: "lorempixel", alt: "lorempixel" })
                ),
                React.createElement(
                    Block,
                    { title: "Transport" },
                    React.createElement("img", { src: "http://lorempixel.com/800/600/transport", title: "lorempixel", alt: "lorempixel" })
                )
            )
        );
    }
});

return React.createElement(DetailSample, null);