// Dependencies

'use strict';

var builder = require('focus').component.builder;

var React = require('react');

var _require = require('lodash/collection');

var map = _require.map;

// Components

var Button = require('../button/action').component;

var TopicDisplayer = {

    /**
     * Display name.
     */
    displayName: 'topic-displayer',

    /**
     * Default props.
     * @returns {object} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction() {}, // Action when click on topic
            topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
            displayLabels: false
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function render() {
        var _this = this;

        var _props = this.props;
        var displayLabels = _props.displayLabels;
        var topicList = _props.topicList;

        return React.createElement(
            'div',
            { 'data-focus': 'topic-displayer' },
            map(topicList, function (topic, key) {
                var text = displayLabels ? topic.label + ': ' + topic.value : topic.value;
                return React.createElement(Button, {
                    handleOnClick: _this.topicClickHandler(key),
                    icon: 'clear',
                    key: key,
                    label: text
                });
            })
        );
    },

    /**
     * Action on the topic click.
     * @param  {String} key  topic key
     * @return {Function}     Click handler
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this2 = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            _this2.props.topicClickAction(key);
        };
    }
};

module.exports = builder(TopicDisplayer);