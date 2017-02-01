import builder from 'focus-core/component/builder';
var React = require('react');
let emptyMixin = {
    componentWillMount () {
        console.warn('FocusComponents v0.15: the \'Empty\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Empty');
    },
    render() {
        return <div data-focus='empty'></div>
    }
}

module.exports = builder(emptyMixin);
