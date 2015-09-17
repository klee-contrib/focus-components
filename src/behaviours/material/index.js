const ReactDOM = require('react-dom');

const Material = ref => Component => class MaterialComponent extends Component {
    componentDidMount() {
        if (Component.prototype.componentDidMount) {
            Component.prototype.componentDidMount();
        }
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.upgradeElement(refNode);
        }
    }

    componentWillUnmount() {
        if (Component.prototype.componentWillUnmount) {
            Component.prototype.componentWillUnmount();
        }
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.downgradeElements(refNode);
        }
    }
};

export default Material;
