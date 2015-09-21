var builder = require('focus-core').component.builder;
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
    getDefaultProps: function(){
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderImg(){
        var className = 'icon ' + this.props.src;
        return <span className={className} onClick={this.props.onClick}>&nbsp;</span>;
    }
};

module.exports =  builder(imgMixin);
