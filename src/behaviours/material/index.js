import ReactDOM from 'react-dom';
import 'material-design-lite/material';

const Material = (ref, jsClass, watchedProp) => Component => class MaterialComponent extends Component {
    componentDidMount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.upgradeElement(refNode, jsClass);
        }
        if (Component.prototype.componentDidMount) {
            Component.prototype.componentDidMount.call(this);
        }
    }

    componentWillUnmount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.downgradeElements(refNode, jsClass);
        }
        if (Component.prototype.componentWillUnmount) {
            Component.prototype.componentWillUnmount.call(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        const propName = watchedProp || 'error';
        const newWatchedProp = nextProps[propName];
        if (newWatchedProp !== this.props[propName] || ((this.props.placeholder || nextProps.placeholder) && this.props.value !== nextProps.value)) {
            const refNode = ReactDOM.findDOMNode(this.refs[ref]);
            componentHandler.upgradeElement(refNode, jsClass);
        }
        if (Component.prototype.componentWillReceiveProps) {
            Component.prototype.componentWillReceiveProps.call(this, nextProps);
        }
    }
};

Material.componentHandler = componentHandler;

export default Material;
