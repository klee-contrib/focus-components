const React = require('react');

const Material = ref => Component => class MaterialComponent extends React.Component {
    componentDidMount() {
        const refNode = React.findDOMNode(this.refs.child.refs[ref]);
        if (refNode) {
            componentHandler.upgradeElement(refNode);
        }
    }

    componentWillUnmount() {
        const refNode = React.findDOMNode(this.refs.child.refs[ref]);
        if (refNode) {
            componentHandler.downgradeElement(refNode);
        }
    }

    render() {
        return <Component ref='child' {...this.props}/>;
    }
};

export default Material;
