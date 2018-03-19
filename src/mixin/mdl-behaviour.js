import ReactDOM from 'react-dom';
import 'material-design-lite/material';

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

export default mdlBehaviourMixin;
