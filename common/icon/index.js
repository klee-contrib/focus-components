var builder = require('focus').component.builder;
var React = require('react');

var type = require('focus').component.types;

var iconMixin = {
    /**
     * Display name.
     */
    displayName: 'icon',
    /**
     * Default props.
     * @returns {object} Initial props.
     */
    getDefaultProps: function(){
        return {
          prefix: 'fa fa-',
          name: ''
        };
    },
    propTypes: {
      prefix: type('string'),
      name: type('string')
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderIcon(){
        var className = `${this.props.prefix}${this.props.name}`;
        return <i className={className} onClick={this.props.onClick}></i>;
    }
};

module.exports = builder(iconMixin);
