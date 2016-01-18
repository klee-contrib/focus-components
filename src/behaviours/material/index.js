import ReactDOM from 'react-dom';
let {componentHandler} = require('material-design-lite/material');

// For tests only, @anyone feel free to suggest any improvement to this dirty hack
if (!componentHandler) {
    componentHandler = {
        upgradeElement() {},
        downgradeElements() {}
    }
}

const Material = (ref, watchedProp: 'error') => Component => class MaterialComponent extends Component {
    componentDidMount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.upgradeElement(refNode);
        }
        if (Component.prototype.componentDidMount) {
            Component.prototype.componentDidMount.call(this);
        }
    }

    componentWillUnmount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.downgradeElements(refNode);
        }
        if (Component.prototype.componentWillUnmount) {
            Component.prototype.componentWillUnmount.call(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        const newWatchedProp = nextProps[watchedProp];
        if (newWatchedProp !== this.props[watchedProp]) {
            const refNode = ReactDOM.findDOMNode(this.refs[ref]);
            componentHandler.upgradeElement(refNode);
        }
        if (Component.prototype.componentWillReceiveProps) {
            Component.prototype.componentWillReceiveProps.call(this, nextProps);
        }
    }
};

Material.componentHandler = componentHandler;

export default Material;
