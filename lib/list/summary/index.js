/**@jsx*/
'use strict';

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
    getDefaultProps: function getDefaultProps() {
        return {
            nb: undefined,
            queryText: undefined,
            scopeList: {},
            scopeClickAction: function scopeClickAction(scopeKey) {},
            exportAction: function exportAction() {}
        };
    },
    _getResultSentence: function _getResultSentence() {
        return React.createElement(
            'span',
            null,
            React.createElement(
                'strong',
                null,
                numberFormatter.format(this.props.nb)
            ),
            ' ',
            this.i18n('result.for'),
            ' "',
            this.props.queryText,
            '"'
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function renderActionBar() {
        return React.createElement(
            'div',
            { 'data-focus': 'list-summary' },
            React.createElement(
                'div',
                { className: 'print' },
                React.createElement(Button, { shape: 'link', icon: 'print', label: 'result.export', handleOnClick: this.props.exportAction })
            ),
            React.createElement(
                'span',
                { className: 'sentence' },
                this._getResultSentence()
            ),
            React.createElement(
                'span',
                { className: 'topics' },
                React.createElement(TopicDisplayer, { topicList: this.props.scopeList, topicClickAction: this.props.scopeClickAction })
            )
        );
    }
};

module.exports = builder(listSummaryMixin);