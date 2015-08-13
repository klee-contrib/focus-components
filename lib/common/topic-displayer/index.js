'use strict';

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
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction(key) {}, // Action when click on topic
            topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
            displayLabels: false
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderSelectAcion() {
        var topicList = [];
        var className = 'btn btn-primary btn-raised topic';
        for (var key in this.props.topicList) {
            var text = this.props.displayLabels ? this.props.topicList[key].label + ': ' + this.props.topicList[key].value : this.props.topicList[key].value;
            topicList.push(React.createElement(
                'a',
                { key: key, href: 'javascript:void(0)', onClick: this.topicClickHandler(key), className: className },
                text
            ));
        }
        var style = 'topic-displayer bs-component ';
        if (this.props.style) {
            style += this.props.style;
        }
        return React.createElement(
            'span',
            { 'data-focus': 'topic-displayer' },
            topicList
        );
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            _this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(topicDisplayerMixin);