import TopicDisplayer from 'focus-components/components/topic-displayer';

const topicList = {
    t1: 'Topic 1',
    t2: 'Topic 2',
    t3: 'Topic 3'
};

const TopicDisplayerExample = React.createClass({
    topicClickAction(topicKey) {
        console.log(topicKey);
    },
    render() {
        console.log(this);

        return (
            <div>
                <TopicDisplayer topicClickAction={() => { this.topicClickAction(topicList) }} />
            </div>
        );
    }
});

export default TopicDisplayerExample;
