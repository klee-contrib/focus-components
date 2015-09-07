// Dependencies

const builder = require('focus').component.builder;
const type = require('focus').component.types;
const React = require('react');
const actionWrapper = require('../../page/search/search-header/action-wrapper');
const {bar: style} = require('./style');

// Components

const Scope = require('./scope').component;
const Input = require('../../common/input/text').component;

// Mixins

const stylable = require('../../mixin/stylable');
const i18n = require('../../common/i18n/mixin');

/**
 * SearchBar component
 * @type {Object}
 */
const SearchBar = {
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
    _broadcastQueryChange() {
        actionWrapper(() => {
            this.props.action.updateProperties({
                query: React.findDOMNode(this.refs.query).value
            });
        })();
    },
    _onInputChange({target: {value: query}}) {
        this.setState({query});
        const {minChar} = this.props;
        if (query.length >= minChar) {
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
        if ('Enter' === event.key) {
            actionWrapper(() => {
                this.props.action.updateProperties({
                    query: React.findDOMNode(this.refs.query).value
                });
            }, null, 0)();
        }
    },
    _renderHelp() {
        return (
            <div ref='help' style={style.help}>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    render() {
        const {loading, hasScopes, placeholder, scopes} = this.props;
        const {query, scope} = this.state;
        return (
            <div data-focus='search-bar' style={style.parent}>
                {hasScopes &&
                    <Scope list={scopes} onScopeSelection={this._onScopeSelection} ref='scope' value={scope}/>
                }
                <div style={style.inputZone}>
                    <Input onChange={this._onInputChange} onKeyPress={this._handleInputKeyPress} placeholder={placeholder} ref='query' value={query}/>
                    {loading &&
                        <div className={`sb-spinner three-quarters-loader`} style={style.loader}/>
                    }
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
