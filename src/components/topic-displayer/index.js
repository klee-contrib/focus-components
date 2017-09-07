import React from 'react';
import { translate } from 'focus-core/translation';
import map from 'lodash/collection/map';
import Button from '../button';

/**
* Action on the topic click.
* @param  {String} key  topic key
* @return {Function}     Click handler
*/
function topicClickHandler(key, topicClickAction) {
    topicClickAction(key);
}

function TopicDisplayer({ displayLabels, topicList, topicClickAction }) {
    return (
        <div data-focus='topic-displayer'>
            {map(topicList, (topic, key) => {
                const text = displayLabels ? `${translate(topic.label)}: ${translate(topic.value)}` : translate(topic.value);
                return (
                    <Button
                        handleOnClick={() => { topicClickHandler(key, topicClickAction) }}
                        icon='clear'
                        key={key}
                        label={text}
                    />
                );
            })}
        </div>
    );
}

TopicDisplayer.displayName = 'TopicDisplayer';

TopicDisplayer.defaultProps = {
    style: undefined, // Component css style.
    topicClickAction() { }, // Action when click on topic
    topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
    displayLabels: false
}

export default TopicDisplayer;
