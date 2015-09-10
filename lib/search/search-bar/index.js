// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
var React = require('react');
var actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components
var Scope = require('./scope').component;
var Input = require('../../common/input/text').component;

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
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: 'search.bar.placeholder',
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
    /**
    * Get the initial state
    * @return {Object} the initial state
    */
    getInitialState: function getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },
    /**
     * Component did mount handler
     */
    componentDidMount: function componentDidMount() {
        this._focusQuery();
    },
    /**
     * Component will mount handler
     */
    componentWillMount: function componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
    },
    /**
     * Component did unmount handler
     */
    componentWillUnmount: function componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
    },
    /**
     * Query changed in store event handler
     */
    _onQueryChangeFromStore: function _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },
    /**
     * Scope changed in store event handler
     */
    _onScopeChangeFromStore: function _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },
    /**
     * Broadcast query change
     */
    _broadcastQueryChange: function _broadcastQueryChange() {
        var _this = this;

        actionWrapper(function () {
            _this.props.action.updateProperties({
                query: React.findDOMNode(_this.refs.query).value
            });
        })();
    },
    /**
     * Input change handler
     * @param  {String} query the new query
     */
    _onInputChange: function _onInputChange(_ref) {
        var query = _ref.target.value;

        this.setState({ query: query });
        var minChar = this.props.minChar;

        if (query.length >= minChar) {
            this._broadcastQueryChange();
        }
    },
    /**
     * Scope selection handler
     * @param  {Object} scope selected scope
     */
    _onScopeSelection: function _onScopeSelection(scope) {
        this._focusQuery();
        this.props.action.updateProperties({
            scope: scope,
            selectedFacets: {},
            groupingKey: undefined
        });
        this.setState({ scope: scope });
    },
    /**
     * Input key press handler
     * @param  {String} key pressed key
     */
    _handleInputKeyPress: function _handleInputKeyPress(_ref2) {
        var _this2 = this;

        var key = _ref2.key;

        if ('Enter' === key) {
            actionWrapper(function () {
                _this2.props.action.updateProperties({
                    query: React.findDOMNode(_this2.refs.query).value
                });
            }, null, 0)();
        }
    },
    /**
     * Render help message
     * @return {HTML} rendered help message
     */
    _renderHelp: function _renderHelp() {
        return React.createElement(
            'div',
            { ref: 'help' },
            this.i18n(this.props.helpTranslationPath)
        );
    },
    /**
     * Focus the query input field
     */
    _focusQuery: function _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    /**
    * Render the component.
    * @return {HTML} - The rendered component
    */
    render: function render() {
        var _props = this.props;
        var loading = _props.loading;
        var hasScopes = _props.hasScopes;
        var placeholder = _props.placeholder;
        var scopes = _props.scopes;
        var _state = this.state;
        var query = _state.query;
        var scope = _state.scope;

        return React.createElement(
            'div',
            { 'data-focus': 'search-bar' },
            hasScopes && React.createElement(Scope, { list: scopes, onScopeSelection: this._onScopeSelection, ref: 'scope', value: scope }),
            React.createElement(
                'div',
                { 'data-focus': 'search-bar-input' },
                React.createElement(Input, { onChange: this._onInputChange, onKeyPress: this._handleInputKeyPress, placeholder: placeholder, ref: 'query', value: query }),
                loading && React.createElement('div', { className: 'sb-spinner three-quarters-loader' })
            )
        );
    }
};

module.exports = builder(SearchBar);