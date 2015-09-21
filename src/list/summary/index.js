/**@jsx*/
const {builder, types} = require('focus-core').component;
const i18nBehaviour = require('../../common/i18n/mixin');
const styleBehaviour = require('../../mixin/stylable');

const TopicDisplayer = require('../../common/topic-displayer').component;
const Button = require('../../common/button/action').component;
const numberFormatter = require('focus-core').definition.formatter.number;

const listSummaryMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
    /**
     * Display name.
     */
    displayName: 'list-summary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps () {
        return {
            scopeList: {},
            /**
             * Action on click on scope.
             */
            scopeClickAction() {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        nb: types('number'),
        queryText: types('string'),
        scopeList: types('array').isRequired,
        scopeClickAction: types('func'),
        exportAction: types('func')
    },
    /**
     * Return result sentence.
     * @return {object} Result sentence
     */
    _getResultSentence() {
        const {nb, queryText} = this.props;
        return (
            <span>
                <strong>{numberFormatter.format(nb)}</strong> {this.i18n('result.for')} &#34;{queryText}&#34;
            </span>
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render() {
        const {exportAction, scopeList, scopeClickAction} = this.props;
        return (
            <div data-focus="list-summary">
                {exportAction &&
                    <div className="print">
                        <Button handleOnClick={exportAction} icon="print" label="result.export" shape="link" />
                    </div>
                }
                <span className="sentence">{this._getResultSentence()}</span>
                <span className="topics">
                    <TopicDisplayer topicClickAction={scopeClickAction} topicList={scopeList} />
                </span>
            </div>
        );
    }
};

module.exports = builder(listSummaryMixin);
