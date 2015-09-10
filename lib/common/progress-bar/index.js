// Dependencies

'use strict';

var builder = require('focus').component.builder;

// Mixins

var mdlBehaviour = require('../mixin/mdl-behaviour');

var Progress = {
    mixins: [mdlBehaviour],
    /**
     * Get default props
     * @return {Object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            completed: 0
        };
    },
    componentDidMount: function componentDidMount() {
        var bar = React.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(0);
            bar.MaterialProgress.setBuffer(100);
        }
    },
    /**
     * Component will receive props
     * @param  {Object} completed new completed prop
     */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var completed = _ref.completed;

        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        var bar = React.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    },
    /**
     * Render the component
     * @return {Function} the rendered component
     */
    render: function render() {
        var completed = +this.props.completed;
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        return React.createElement('div', { className: 'mdl-progress mdl-js-progress', 'data-focus': 'progress-bar', ref: 'bar' });
    }
};

module.exports = builder(Progress);