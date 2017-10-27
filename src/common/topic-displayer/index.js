import React from 'react';
import builder from 'focus-core/component/builder';
import { translate } from 'focus-core/translation';
import map from 'lodash/collection/map';
// Components
import { component as Button } from '../button/action';

const TopicDisplayer = {
    displayName: 'TopicDisplayer',

    /**
     * Default props.
     * @returns {object} default props.
     */
    getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction() { }, // Action when click on topic
            topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
            displayLabels: false
        };
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/topic-displayer instead');
    },
    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render() {
        const { displayLabels, topicList } = this.props;
        return (
            <div data-focus='topic-displayer'>
                {map(topicList, (topic, key) => {
                    const text = displayLabels ? `${translate(topic.label)}: ${translate(topic.value)}` : translate(topic.value);
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
            if (event) {
                event.preventDefault();
            }
            this.props.topicClickAction(key);
        };
    }
};

const { mixin, component } = builder(TopicDisplayer);
export { mixin, component };
export default { mixin, component };
