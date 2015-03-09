var builder = require('focus/component/builder');
var React = require('react');


var topicDisplayerMixin = {

    /**
     * Display name.
     */
    displayName: "topic-displayer",

    /**
     * Default props.
     */
    getDefaultProps: function(){
        return {
            style: undefined, // Component css style.
            topicClickAction: function(key) {}, // Action when click on topic
            topicList:{} // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics
        };
    },

    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderSelectAcion(){
        var topicList = [];
        var className = "btn btn-primary btn-raised topic";
        for(var key in this.props.topicList) {
            topicList.push(<a href="javascript:void(0)"  onClick={this.topicClickHandler(this.props.topicClickAction, key)} className={className}>{this.props.topicList[key]}</a>);
        }
        var style = "topic-displayer bs-component ";
        if(this.props.style) {
            style+= this.props.style;
        }
        return (<p className={style}>{topicList}</p>);
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(func, key) {
        return function() { func(key); };
    }
};

module.exports =  builder(topicDisplayerMixin);
