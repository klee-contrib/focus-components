// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');
let actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components

let Scope = require('./scope').component;

// Mixins

let stylable = require('../../mixin/stylable');
let i18n = require('../../common/i18n/mixin');

/**
 * SearchBar component
 * @type {Object}
 */
let SearchBar = {
    mixins: [i18n, stylable],
    displayName: 'SearchBar',
    getDefaultProps() {
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
    getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },
    componentDidMount() {
        React.findDOMNode(this.refs.query).focus();
    },
    componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
    },
    componentWillUnmoun() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
    },
    _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },
    _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },
    _getClassName() {
        return `form-control`;
    },
    _broadcastQueryChange() {
        actionWrapper(() => {
            this.props.action.updateProperties({
                query: React.findDOMNode(this.refs.query).value
            });
        })();
    },
    _onInputChange(event) {
        this.setState({query: event.target.value});
        if (event.target.value.length >= this.props.minChar) {
            this._broadcastQueryChange();
        }
    },
    _onScopeSelection(scope) {
        this._focusQuery();
        this.props.action.updateProperties({
            scope,
            selectedFacets: {},
            groupingKey: undefined
        });
        this.setState({scope});
    },
    _handleInputKeyPress(event) {
        if (event.key === 'Enter') {
            actionWrapper(() => {
                this.props.action.updateProperties({
                    query: React.findDOMNode(this.refs.query).value
                });
            }, null, 0)();
        }
    },
    _renderHelp() {
        return (
            <div className='sb-help' ref='help'>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    render() {
        let loadingClassName = this.props.loading ? 'sb-loading' : '';
        let scopeClassName = this.props.hasScopes ? 'withScopes' : 'noScopes';
        return (
            <div className={`${this._getStyleClassName()} ${scopeClassName}`} data-focus='search-bar'>
                {this.props.hasScopes &&
                    <div className='sb-scope-choice'>
                        <Scope onScopeSelection={this._onScopeSelection} list={this.props.scopes} ref='scope' value={this.state.scope}/>
                    </div>
                }
                <div className='sb-input-search'>
                    <input autofocus className={this._getClassName()} onKeyPress={this._handleInputKeyPress} onChange={this._onInputChange} ref='query' type='search' placeholder={this.props.placeholder} value={this.state.query}/>
                    <div className={`sb-spinner three-quarters-loader ${loadingClassName}`}></div>
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
