const ReactDOM = require('react-dom');

const Material = (ref, watchedProp: 'error') => Component => class MaterialComponent extends Component {
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

    componentWillReceiveProps = nextProps => {
        if (Component.prototype.componentWillReceiveProps) {
            Component.prototype.componentWillReceiveProps(nextProps);
        }
        const newWatchedProp = nextProps[watchedProp];
        if (newWatchedProp !== this.props[watchedProp]) {
            const refNode = ReactDOM.findDOMNode(this.refs[ref]);
            componentHandler.upgradeElement(refNode);
        }
    }
};

export default Material;
