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
        watchedProp = watchedProp || 'error';
        const newWatchedProp = nextProps[watchedProp];
        if (newWatchedProp !== this.props[watchedProp]) {
            const refNode = ReactDOM.findDOMNode(this.refs[ref]);
            componentHandler.upgradeElement(refNode, jsClass);
        }
        if (Component.prototype.componentWillReceiveProps) {
            Component.prototype.componentWillReceiveProps.call(this, nextProps);
        }
    }

    componentDidUpdate() {
        if(jsClass === 'MaterialTextfield') {
            this.refs.inputText.MaterialTextfield.change(this.props.value);
        }
    }
};

Material.componentHandler = componentHandler;

export default Material;
