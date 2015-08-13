// Dependencies

'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
var React = require('react');
var actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components

var Scope = require('./scope').component;

// Mixins

var stylable = require('../../mixin/stylable');
var i18n = require('../../common/i18n/mixin');

/**
 * SearchBar component
 * @type {Object}
 */
var SearchBar = {
    mixins: [i18n, stylable],
    displayName: 'SearchBar',
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: 'Enter your search here...',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true,
            identifier: undefined,
            store: undefined,
            action: undefined
        };
    },
    propTypes: {
        placeholder: type('string'),
        value: type('string'),
        scopes: type('array'),
        minChar: type('number'),
        loading: type('bool'),
        helpTranslationPath: type('string'),
        hasScopes: type('bool')
    },
    getInitialState: function getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },
    componentDidMount: function componentDidMount() {
        React.findDOMNode(this.refs.query).focus();
    },
    componentWillMount: function componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
    },
    componentWillUnmoun: function componentWillUnmoun() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
    },
    _onQueryChangeFromStore: function _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },
    _onScopeChangeFromStore: function _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },
    _getClassName: function _getClassName() {
        return 'form-control';
    },
    _broadcastQueryChange: function _broadcastQueryChange() {
        var _this = this;

        actionWrapper(function () {
            _this.props.action.updateProperties({
                query: React.findDOMNode(_this.refs.query).value
            });
        })();
    },
    _onInputChange: function _onInputChange(event) {
        this.setState({ query: event.target.value });
        if (event.target.value.length >= this.props.minChar) {
            this._broadcastQueryChange();
        }
    },
    _onScopeSelection: function _onScopeSelection(scope) {
        this._focusQuery();
        this.props.action.updateProperties({
            scope: scope,
            selectedFacets: {},
            groupingKey: undefined
        });
        this.setState({ scope: scope });
    },
    _handleInputKeyPress: function _handleInputKeyPress(event) {
        var _this2 = this;

        if (event.key === 'Enter') {
            actionWrapper(function () {
                _this2.props.action.updateProperties({
                    query: React.findDOMNode(_this2.refs.query).value
                });
            }, null, 0)();
        }
    },
    _renderHelp: function _renderHelp() {
        return React.createElement(
            'div',
            { className: 'sb-help', ref: 'help' },
            this.i18n(this.props.helpTranslationPath)
        );
    },
    _focusQuery: function _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    render: function render() {
        var loadingClassName = this.props.loading ? 'sb-loading' : '';
        var scopeClassName = this.props.hasScopes ? 'withScopes' : 'noScopes';
        return React.createElement(
            'div',
            { className: this._getStyleClassName() + ' ' + scopeClassName, 'data-focus': 'search-bar' },
            this.props.hasScopes && React.createElement(
                'div',
                { className: 'sb-scope-choice' },
                React.createElement(Scope, { onScopeSelection: this._onScopeSelection, list: this.props.scopes, ref: 'scope', value: this.state.scope })
            ),
            React.createElement(
                'div',
                { className: 'sb-input-search' },
                React.createElement('input', { autofocus: true, className: this._getClassName(), onKeyPress: this._handleInputKeyPress, onChange: this._onInputChange, ref: 'query', type: 'search', placeholder: this.props.placeholder, value: this.state.query }),
                React.createElement('div', { className: 'sb-spinner three-quarters-loader ' + loadingClassName })
            ),
            this._renderHelp()
        );
    }
};

module.exports = builder(SearchBar);