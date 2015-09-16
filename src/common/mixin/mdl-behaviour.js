//https://github.com/google/material-design-lite/blob/master/src/mdlComponentHandler.js#L333
const React = require('react');
const ReactDOM = require('react-dom');

const mdlBehaviourMixin = {

    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        if (ReactDOM.findDOMNode(this)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount() {
        if (ReactDOM.findDOMNode(this)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this));
        }
    }

};

module.exports = mdlBehaviourMixin;
