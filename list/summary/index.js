/**@jsx*/
var builder = require('focus').component.builder;
var TopicDisplayer = require('../../common/topic-displayer').component;
var Button = require('../../common/button/action').component;

var listSummaryMixin = {

    /**
     * Display name.
     */
    displayName: 'list-summary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps: function() {
        return {
            nb: undefined,
            queryText: undefined,
            scopeList: {},
            scopeClickAction: function(scopeKey) {},
            exportAction: function() {}
        };
    },

    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function renderActionBar(){
        if(this.props.nb) {
            var nbResult = <div className="nb-result">{this.props.nb} result.for "{this.props.queryText}"</div>;
        }
        return (
            <div className="list-summary">
                <div className="scope"><TopicDisplayer topicList={this.props.scopeList} topicClickAction={this.props.scopeClickAction}  /></div>
                {nbResult}
                <div className="print"><Button imgSrc="print" handleOnClick={this.props.exportAction} /></div>
            </div>);
    }
};

module.exports = builder(listSummaryMixin);