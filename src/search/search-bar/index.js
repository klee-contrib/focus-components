// Dependencies
import PropTypes from 'prop-types';

import React from 'react';
import ReactDOM from 'react-dom';
import builder from 'focus-core/component/builder';
import { translate } from 'focus-core/translation';

import actionWrapper from '../../page/search/search-header/action-wrapper';

// Components
import { component as Scope } from './scope';
import Input from '../../components/input/text';

// Mixins
import stylable from '../../mixin/stylable';

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
            onSearchCriteriaChangeByUser: undefined,
            keepProperties: {
                groupingKey: false,
                sortBy: false,
                sortAsc: false
            }
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
        onSearchCriteriaChangeByUser: PropTypes.func,
        keepProperties: PropTypes.shape({
            groupingKey: PropTypes.bool.isRequired,
            sortBy: PropTypes.bool.isRequired,
            sortAsc: PropTypes.bool.isRequired
        })
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

    componentWillReceiveProps({ store }) {
        if (store.identifier !== this.props.store.identifier) {
            this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
            this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
            this.props.store.removeResultsChangeListener(this._onResultsChangeFromStore);

            store.addQueryChangeListener(this._onQueryChangeFromStore);
            store.addScopeChangeListener(this._onScopeChangeFromStore);
            store.addResultsChangeListener(this._onResultsChangeFromStore);
        }
    },

    /**
    * Component did unmount handler
    */
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
        this.props.store.removeResultsChangeListener(this._onResultsChangeFromStore);
    },

    componentDidUpdate({ store }) {
        if (store.identifier !== this.props.store.identifier) {
            this._onQueryChangeFromStore();
            this._onScopeChangeFromStore();
            this._onResultsChangeFromStore();
        }
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
        this.setState({ loading: false });
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
        this.setState({ query });
        const { minChar, onSearchCriteriaChangeByUser } = this.props;
        if (query.length >= minChar) {
            this._broadcastQueryChange();
        }
        if (onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },
    /**
    * Scope selection handler
    * @param  {Object} scope selected scope
    */
    _onScopeSelection(scope) {
        this._focusQuery();
        const { action, onSearchCriteriaChangeByUser, keepProperties: { groupingKey, sortBy, sortAsc } } = this.props;
        const properties = {
            scope,
            selectedFacets: {}
        };
        if (!groupingKey) {
            properties.groupingKey = undefined;
        }
        if (!sortBy) {
            properties.sortBy = undefined;
        }
        if (!sortAsc) {
            properties.sortAsc = true;
        }
        action.updateProperties(properties);
        this.setState({ scope });
        if (onSearchCriteriaChangeByUser) {
            onSearchCriteriaChangeByUser();
        }
    },  
    /**
    * Input key press handler
    * @param  {String} key pressed key
    */
    _handleInputKeyPress({ key }) {
        if ('Enter' === key) {
            const { onSearchCriteriaChangeByUser } = this.props;
            actionWrapper(() => {
                this.props.action.updateProperties({
                    query: this.refs.query.getValue()
                });
            }, null, 0)();
            if (onSearchCriteriaChangeByUser) {
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
        const { hasScopes, scopes } = this.props;
        const { loading, query, scope } = this.state;
        let placeholder = this.props.placeholder;
        if (query && 0 < query.length) {
            placeholder = '';
        }
        return (
            <div data-focus='search-bar'>
                {hasScopes &&
                    <Scope list={scopes} onScopeSelection={this._onScopeSelection} ref='scope' value={scope} />
                }
                <div data-focus='search-bar-input'>
                    <Input name='searchbarinput' onChange={this._onInputChange} onKeyPress={this._handleInputKeyPress} placeholder={translate(placeholder)} ref='query' value={query} />
                    {loading &&
                        <div className='three-quarters-loader' data-role='spinner' />
                    }
                </div>
            </div>
        );
    }
};

const { mixin, component } = builder(SearchBar);
export default {
    mixin, component
}
export {
    mixin,
    component
}