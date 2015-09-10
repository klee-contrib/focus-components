//https://github.com/google/material-design-lite/blob/master/src/mdlComponentHandler.js#L333
const componentHandler = window.componentHandler;

const mdlBehaviourMixin = {

    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        if (React.findDOMNode(this)) {
            componentHandler.upgradeElement(React.findDOMNode(this));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount() {
        if (React.findDOMNode(this)) {
            componentHandler.downgradeElements(React.findDOMNode(this));
        }
    }

};

module.exports = mdlBehaviourMixin;
