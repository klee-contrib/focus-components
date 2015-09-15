"use strict";

var ButtonBackToTop = FocusComponents.common.button.backToTop.component;

var ButtonBTSample = React.createClass({
    displayName: "ButtonBTSample",

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            "div",
            { className: "button-bt-example" },
            React.createElement("img", { src: "http://lorempixel.com/800/600/sports/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/abstract/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/city/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/technics/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/sports/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/abstract/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/city/" }),
            React.createElement("img", { src: "http://lorempixel.com/800/600/technics/" }),
            React.createElement(ButtonBackToTop, null)
        );
    }
});

return React.createElement(ButtonBTSample, null);