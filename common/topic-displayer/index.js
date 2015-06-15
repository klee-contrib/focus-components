var builder = require('focus').component.builder;
var React = require('react');


var topicDisplayerMixin = {

    /**
     * Display name.
     */
    displayName: 'topic-displayer',

    /**
     * Default props.
     * @returns {object} Defautl props.
     */
    getDefaultProps: function(){
        return {
            style: undefined, // Component css style.
            topicClickAction: function(key) {}, // Action when click on topic
            topicList: {} // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderSelectAcion(){
        var topicList = [];
        var className = 'btn btn-primary btn-raised topic';
        for(var key in this.props.topicList) {
            topicList.push(<a key={key} href="javascript:void(0)" onClick={this.topicClickHandler(key)} className={className}>{this.props.topicList[key]}</a>);
        }
        var style = 'topic-displayer bs-component ';
        if(this.props.style) {
            style += this.props.style;
        }
        return (<span data-focus='topic-displayer'>{topicList}</span>);
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(key) {
        return (event)=> {
            if(event) {
                event.preventDefault();
            }
            this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(topicDisplayerMixin);
