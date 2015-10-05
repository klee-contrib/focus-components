/* globals babel */

// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
import babel from 'babel-core/browser';

const LivePreview = React.createClass({
    displayName: 'LivePreview',
    propTypes: {
        code: types('string'),
        style: types('object')
    },
    /*style: {
        title: {
            margin: '15px',
            color: '#372B3F'
        },
        component: {
            padding: '5px'
        }
    },*/
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render() {
        const {code, style: mainStyle} = this.props;
        const {style} = this;
        let content;
        try {
            /* eslint-disable */
            content = eval(babel.transform(`(function(){${code}})()`, {stage: 0}).code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }

        return <div>{content}</div>;
    }
});

module.exports = LivePreview;
