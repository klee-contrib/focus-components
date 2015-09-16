// Dependencies
const React = require('react');
const ReactDOM = require('react-dom');

const {builder} = require('focusjs').component;

// Mixins

const mdlBehaviour = require('../mixin/mdl-behaviour');

const Progress = {
    mixins: [mdlBehaviour],
    /**
     * Get default props
     * @return {Object} the default props
     */
    getDefaultProps(){
        return {
            completed: 0
        };
    },
    componentDidMount() {
        const bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(0);
            bar.MaterialProgress.setBuffer(100);
        }
    },
    /**
     * Component will receive props
     * @param  {Object} completed new completed prop
     */
    componentWillReceiveProps({completed}) {
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        const bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    },
    /**
     * Render the component
     * @return {Function} the rendered component
     */
    render() {
        let completed = +this.props.completed;
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        return (
            <div className='mdl-progress mdl-js-progress' data-focus='progress-bar' ref='bar' />
        );
    }
};

module.exports = builder(Progress);
