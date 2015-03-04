var builder = require('focus/component/builder');
var React = require('react');


var selectActionMixin = {

    displayName: "img",
    getDefaultProps: function(){
        return {
            src: undefined,
            onClick: undefined
        };
    },
    render: function renderImg(){
        var className = "icon " + this.props.src;
        return <span className={className} onClick={this.props.onClick}>&nbsp;</span>;
    }
};

module.exports =  builder(selectActionMixin);
