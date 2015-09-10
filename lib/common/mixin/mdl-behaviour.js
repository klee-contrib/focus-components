//https://github.com/google/material-design-lite/blob/master/src/mdlComponentHandler.js#L333
"use strict";

var componentHandler = window.componentHandler;

var mdlBehaviourMixin = {

    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (React.findDOMNode(this)) {
            componentHandler.upgradeElement(React.findDOMNode(this));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (React.findDOMNode(this)) {
            componentHandler.downgradeElements(React.findDOMNode(this));
        }
    }

};

module.exports = mdlBehaviourMixin;