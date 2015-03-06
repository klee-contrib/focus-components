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
        var liList = [];
        for(var key in this.props.topicList) {
            liList.push(<li className="topic"><span  onClick={this.topicClickHandler(this.props.topicClickAction, key)}>{this.props.topicList[key]}</span></li>);
        }
        var style = "topic-displayer ";
        if(this.props.style) {
            style+= this.props.style;
        }
        return (<div className={style}>{liList}</div>);
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(func, key) {
        return function() { func(key); };
    }
};

module.exports =  builder(topicDisplayerMixin);
