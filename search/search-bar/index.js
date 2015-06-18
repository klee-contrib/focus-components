// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');
let words = require('lodash/string/words');
let actionWrapper = require('../../page/search/search-header/action-wrapper');
let assign = require('lodash/object/extend');

// Components

let Scope = require('./scope').component;

// Mixins

let stylable = require('../../mixin/stylable');
let i18n = require('../../common/i18n/mixin');
let storeBehaviour = require('../../common/mixin/store-behaviour');
let queryStoreBehaviour = require('../mixin/query-store-behaviour');

/**
 * SearchBar component
 * @type {Object}
 */
let SearchBar = {
    mixins: [i18n, stylable, storeBehaviour, queryStoreBehaviour],
    stores: [{
        store: Focus.search.builtInStore.queryStore,
        properties: ['query', 'scope']
    }],
    displayName: 'SearchBar',
    getDefaultProps() {
        return {
            placeholder: 'Enter your search here...',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true
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
    getInitialState() {
        return assign({loading: this.props.loading, scope: this.props.scope, query: this.props.query}, this._getStateFromStores());
    },
    componentDidMount() {
        React.findDOMNode(this.refs.query).focus();
    },
    onChange() {
        this.setState(this._getStateFromStores())
    },
    _getClassName() {
        return `form-control`;
    },
    _handleQueryChange() {
        actionWrapper(() => {
            this._updateQuery(React.findDOMNode(this.refs.query).value);
        })();
    },
    _handleKeyUp(event) {
        this.setState({query: event.target.value}, ()=> {
            if (this.state.query.length >= this.props.minChar) {
                if (this.props.handleKeyUp) {
                    this.props.handleKeyUp(event);
                }
                this._handleQueryChange();
            }
        });

    },
    _handleOnClickScope() {
        this._focusQuery();
        this._updateScope(this.refs.scope.getValue());
    },
    _renderHelp() {
        return (
            <div className='sb-help' ref='help'>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    //setStateFromSubComponent() {
    //    return this.setState(this.getValue(), this._focusQuery);
    //},
    render() {
        let loadingClassName = this.props.loading ? 'sb-loading' : '';
        let scopeClassName = this.props.hasScopes ? 'withScopes' : 'noScopes';
        return (
            <div className={`${this._getStyleClassName()} ${scopeClassName}`} data-focus='search-bar'>
                {this.props.hasScopes &&
                <div className='sb-scope-choice'>
                    <Scope handleOnClick={this._handleOnClickScope} list={this.props.scopes} ref='scope'
                           value={this.state.scope}/>
                </div>
                }
                <div className='sb-input-search'>
                    <input autofocus className={this._getClassName()} onChange={this._handleKeyUp} ref='query'
                           type='search' placeholder={this.props.placeholder} value={this.state.query}/>

                    <div className={`sb-spinner three-quarters-loader ${loadingClassName}`}></div>
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
