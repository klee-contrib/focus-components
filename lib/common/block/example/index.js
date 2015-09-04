"use strict";

var Block = FocusComponents.common.block.component;

var BlockSample = React.createClass({
    displayName: "BlockSample",

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            Block,
            { title: "Here is the title" },
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
                "p",
                null,
                "Here is the content."
            ),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null)
        );
    }
});

return React.createElement(BlockSample, null);