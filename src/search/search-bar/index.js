// Dependencies
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import builder from 'focus-core/component/builder';
import {translate} from 'focus-core/translation';

const actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components
const Scope = require('./scope').component;
import Input from '../../components/input/text';

// Mixins
const stylable = require('../../mixin/stylable');

/**
* SearchBar component
* @type {Object}
*/
const SearchBar = {
    mixins: [stylable],
    displayName: 'SearchBar',
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps() {
        return {
            placeholder: 'search.bar.placeholder',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true,
            identifier: undefined,
            store: undefined,
            action: undefined,
            onSearchCriteriaChangeByUser: undefined
        };
    },
    propTypes: {
        hasScopes: PropTypes.bool,
        helpTranslationPath: PropTypes.string,
        loading: PropTypes.bool,
        minChar: PropTypes.number,
        placeholder: PropTypes.string,
        scopes: PropTypes.array,
        value: PropTypes.string,
        onSearchCriteriaChangeByUser: PropTypes.func
    },
    /**
    * Get the initial state
    * @return {Object} the initial state
    */
    getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },
    /**
    * Component did mount handler
    */
    componentDidMount() {
        this._focusQuery();
    },
    /**
    * Component will mount handler
    */
    componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
        this.props.store.addResultsChangeListener(this._onResultsChangeFromStore);
    },
    /**
    * Component did unmount handler
    */
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
        this.props.store.removeResultsChangeListener(this._onResultsChangeFromStore);
    },
    /**
    * Query changed in store event handler
    */
    _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },
    /**
    * Scope changed in store event handler
    */
    _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },

    _onResultsChangeFromStore() {
        this.setState({loading: false});
    },
    /**
    * Broadcast query change
    */
    _broadcastQueryChange() {
        actionWrapper(() => {
            this.props.action.updateProperties({
                query: this.refs.query.getValue()
            });
            this.setState({
                loading: true
            });
        })();
    },
    /**
    * Input change handler
    * @param  {String} query the new query
    */
    _onInputChange(query) {
        this.setState({query});
        const {minChar, onSearchCriteriaChangeByUser} = this.props;
        if (query.length >= minChar) {
            this._broadcastQueryChange();
        }
        if(onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },
    /**
    * Scope selection handler
    * @param  {Object} scope selected scope
    */
    _onScopeSelection(scope) {
        this._focusQuery();
        const {action, onSearchCriteriaChangeByUser} = this.props;
        action.updateProperties({
            scope,
            selectedFacets: {},
            groupingKey: undefined,
            sortBy: undefined,
            sortAsc: true
        });
        this.setState({scope});
        if(onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },
    /**
    * Input key press handler
    * @param  {String} key pressed key
    */
    _handleInputKeyPress({key}) {
        if ('Enter' === key) {
            const {onSearchCriteriaChangeByUser} = this.props;
            actionWrapper(() => {
                this.props.action.updateProperties({
                    query: this.refs.query.getValue()
                });
            }, null, 0)();
            if(onSearchCriteriaChangeByUser) {
                onSearchCriteriaChangeByUser();
            }
        }
    },
    /**
    * Render help message
    * @return {HTML} rendered help message
    */
    _renderHelp() {
        return (
            <div ref='help'>{translate(this.props.helpTranslationPath)}</div>
        );
    },
    /**
    * Focus the query input field
    */
    _focusQuery() {
        ReactDOM.findDOMNode(this.refs.query).focus();
    },
    /**
    * Render the component.
    * @return {HTML} - The rendered component
    */
    render() {
        const {hasScopes, scopes} = this.props;
        const {loading, query, scope} = this.state;
        let placeholder = this.props.placeholder;
        if(query && 0 < query.length) {
            placeholder = '';
        }
        return (
            <div data-focus='search-bar'>
            {hasScopes &&
                <Scope list={scopes} onScopeSelection={this._onScopeSelection} ref='scope' value={scope}/>
            }
            <div data-focus='search-bar-input'>
            <Input name='searchbarinput' onChange={this._onInputChange} onKeyPress={this._handleInputKeyPress} placeholder={translate(placeholder)} ref='query' value={query}/>
            {loading &&
                <div className='three-quarters-loader' data-role='spinner'></div>
            }
            </div>
            </div>
        );
    }
};

module.exports = builder(SearchBar);
