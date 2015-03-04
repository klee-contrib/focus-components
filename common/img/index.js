var builder = require('focus/component/builder');
var React = require('react');


var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {{src: name of the picture, onClick: action handler on click.}}
     */
    getDefaultProps: function(){
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns Html code.
     */
    render: function renderImg(){
        var className = "icon " + this.props.src;
        return <span className={className} onClick={this.props.onClick}>&nbsp;</span>;
    }
};

module.exports =  builder(imgMixin);
