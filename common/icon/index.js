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
    getDefaultProps(){
        return {
          prefix: 'fa fa-',
          name: '',
          other: ''
        };
    },
    propTypes: {
      prefix: type('string'),
      name: type('string'),
      other: type('string')
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderIcon(){
        var className = `${this.props.prefix}${this.props.name} ${this.props.other}`;
        return <i className={className} onClick={this.props.onClick}></i>;
    }
};

module.exports = builder(iconMixin);
