"use strict";

var Scrollspy = FocusComponents.common.scrollspy.component;
var Title = FocusComponents.common.title.component;

var ScrollspySample = React.createClass({
    displayName: "ScrollspySample",

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Scrollspy"
            ),
            React.createElement(
                Scrollspy,
                null,
                React.createElement(Title, { label: "Sports" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/sports", title: "lorempixel" }),
                React.createElement(Title, { label: "Animals" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/animals", title: "lorempixel" }),
                React.createElement(Title, { label: "Business" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/business", title: "lorempixel" }),
                React.createElement(Title, { label: "Cats" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/cats", title: "lorempixel" }),
                React.createElement(Title, { label: "City" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/city", title: "lorempixel" }),
                React.createElement(Title, { label: "Food" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/food", title: "lorempixel" }),
                React.createElement(Title, { label: "Nightlife" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/nightlife", title: "lorempixel" }),
                React.createElement(Title, { label: "Fashion" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/fashion", title: "lorempixel" }),
                React.createElement(Title, { label: "People" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/people", title: "lorempixel" }),
                React.createElement(Title, { label: "Nature" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/nature", title: "lorempixel" }),
                React.createElement(Title, { label: "Technics" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/technics", title: "lorempixel" }),
                React.createElement(Title, { label: "Transport" }),
                React.createElement("img", { alt: "lorempixel", src: "http://lorempixel.com/800/600/transport", title: "lorempixel" })
            )
        );
    }
});

return React.createElement(ScrollspySample, null);