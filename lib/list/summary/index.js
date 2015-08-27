/**@jsx*/
'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../../common/i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');

var TopicDisplayer = require('../../common/topic-displayer').component;
var Button = require('../../common/button/action').component;
var numberFormatter = Focus.definition.formatter.number;

var listSummaryMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
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
            scopeList: {},
            /**
             * Action on click on scope.
             */
            scopeClickAction: function scopeClickAction() {}
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
    _getResultSentence: function _getResultSentence() {
        var _props = this.props;
        var nb = _props.nb;
        var queryText = _props.queryText;

        return React.createElement(
            'span',
            null,
            React.createElement(
                'strong',
                null,
                numberFormatter.format(nb)
            ),
            ' ',
            this.i18n('result.for'),
            ' "',
            queryText,
            '"'
        );
    },
    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function render() {
        var _props2 = this.props;
        var exportAction = _props2.exportAction;
        var scopeList = _props2.scopeList;
        var scopeClickAction = _props2.scopeClickAction;

        return React.createElement(
            'div',
            { 'data-focus': 'list-summary' },
            exportAction && React.createElement(
                'div',
                { className: 'print' },
                React.createElement(Button, { handleOnClick: exportAction, icon: 'print', label: 'result.export', shape: 'link' })
            ),
            React.createElement(
                'span',
                { className: 'sentence' },
                this._getResultSentence()
            ),
            React.createElement(
                'span',
                { className: 'topics' },
                React.createElement(TopicDisplayer, { topicClickAction: scopeClickAction, topicList: scopeList })
            )
        );
    }
};

module.exports = builder(listSummaryMixin);