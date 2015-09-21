// Dependencies

const {builder} = require('focus-core').component;
const React = require('react');
const {map} = require('lodash/collection');

// Components

const Button = require('../button/action').component;

const TopicDisplayer = {

    /**
     * Display name.
     */
    displayName: 'topic-displayer',

    /**
     * Default props.
     * @returns {object} default props.
     */
    getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction() {}, // Action when click on topic
            topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
            displayLabels: false
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render() {
        const {displayLabels, topicList} = this.props;
        return (
            <div data-focus='topic-displayer'>
                {map(topicList, (topic, key) => {
                    const text = displayLabels ? `${topic.label}: ${topic.value}` : topic.value;
                    return (
                        <Button
                            handleOnClick={this.topicClickHandler(key)}
                            icon='clear'
                            key={key}
                            label={text}
                            />
                    );
                })}
            </div>
        );
    },

    /**
     * Action on the topic click.
     * @param  {String} key  topic key
     * @return {Function}     Click handler
     */
    topicClickHandler(key) {
        return (event) => {
            if(event) {
                event.preventDefault();
            }
            this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(TopicDisplayer);
