'use strict';

var builder = require('focus').component.builder;
var React = require('react');

var imgMixin = {
    /**
     * Display name.
     */
    displayName: 'img',
    /**
     * Default props.
     * @returns {object} Initial props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderImg() {
        var className = 'icon ' + this.props.src;
        return React.createElement(
            'span',
            { className: className, onClick: this.props.onClick },
            ' '
        );
    }
};

module.exports = builder(imgMixin);