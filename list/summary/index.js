/**@jsx*/
var builder = require('focus').component.builder;
var TopicDisplayer = require('../../common/topic-displayer').component;
var Button = require('../../common/button/action').component;
var numberFormatter = Focus.definition.formatter.number;

var listSummaryMixin = {
    mixins: [require('../../common/i18n/mixin')],
    /**
     * Display name.
     */
    displayName: 'list-summary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps: function () {
        return {
            nb: undefined,
            queryText: undefined,
            scopeList: {},
            scopeClickAction: function (scopeKey) {
            },
            exportAction: function () {
            }
        };
    },
    _getResultSentence() {
        return (
            <span>
                <strong>{numberFormatter.format(this.props.nb)}</strong> {this.i18n('result.for')} &#34;{this.props.queryText}&#34;
            </span>
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function renderActionBar() {
        return (
            <div data-focus="list-summary">
                <div className="print">
                    <Button shape="link" icon="print" label="result.export" handleOnClick={this.props.exportAction} />
                </div>
                <span className="sentence">{this._getResultSentence()}</span>
                <span className="topics">
                    <TopicDisplayer topicList={this.props.scopeList} topicClickAction={this.props.scopeClickAction} />
                </span>
            </div>
        );
    }
};

module.exports = builder(listSummaryMixin);