"use strict";

var Block = FocusComponents.common.block.component;
var formMixin = FocusComponents.common.form.mixin;

var domain = {
    "DO_TEXT": {
        style: "do_text",
        type: "text",
        component: "PapaSinge",
        validation: [{
            type: "function",
            value: function value() {
                return false;
            }
        }]
    }
};

Focus.definition.domain.container.setAll(domain);
var entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

var BlockSample1 = React.createClass({
    displayName: "BlockSample1",

    definitionPath: 'contact',
    mixins: [formMixin],
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block without actions"
            ),
            React.createElement(
                Block,
                { title: "Here is the title" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var BlockSample2 = React.createClass({
    displayName: "BlockSample2",

    definitionPath: 'contact',
    mixins: [formMixin],
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (default)"
            ),
            React.createElement(
                Block,
                { title: "Here is the title", actions: this._renderActions },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var BlockSample3 = React.createClass({
    displayName: "BlockSample3",

    definitionPath: 'contact',
    mixins: [formMixin],
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (bottom)"
            ),
            React.createElement(
                Block,
                { title: "Here is the title", actions: this._renderActions, actionsPosition: "bottom" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var BlockSample4 = React.createClass({
    displayName: "BlockSample4",

    definitionPath: 'contact',
    mixins: [formMixin],
    hasLoad: false,
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (both)"
            ),
            React.createElement(
                Block,
                { title: "Here is the title", actions: this._renderActions, actionsPosition: "both" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

return React.createElement(
    "div",
    null,
    React.createElement(BlockSample1, null),
    React.createElement("br", null),
    React.createElement(BlockSample2, null),
    React.createElement("br", null),
    React.createElement(BlockSample3, null),
    React.createElement("br", null),
    React.createElement(BlockSample4, null)
);