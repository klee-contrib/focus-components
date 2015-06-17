// Mixins
let i18nMixin = require('../../../../common/i18n').mixin;
let searchBehaviour = require('../../common/search-mixin').mixin;
let searchWrappedAction = require('../action-wrapper');
let SearchBar = require('../../../../search/search-bar').component;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');
let React = require('react');

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour, searchBehaviour],
    getDefaultProps() {
        return ({
            hasScopes: true
        });
    },
    getInitialState() {
        return {
            isLoading: false,
            scope: this.props.scope,
            query: this.props.query
        }
    },
    componentWillMount() {
        this._loadReference();
        Focus.search.builtInStore.queryStore.addQueryChangeListener(this._onQueryStoreChange);
        Focus.search.builtInStore.queryStore.addScopeChangeListener(this._onQueryStoreChange);
    },
    componentWillUnmount() {
        Focus.search.builtInStore.queryStore.removeQueryChangeListener(this._onQueryStoreChange);
        Focus.search.builtInStore.queryStore.removeScopeChangeListener(this._onQueryStoreChange);
    },
    _onQueryStoreChange(event) {
        let query = Focus.search.builtInStore.queryStore.getQuery();
        let scope = Focus.search.builtInStore.queryStore.getScope();
        this.setState({query, scope});
        if (event.informations.callerId === this.refs.searchBar._uuid) {
            this._runSearch()
        }
    },
    _runSearch() {
        return this.props.searchAction(this._buildSearchCriteria())
    },
    _SearchBarComponent() {
        return <SearchBar
            ref='searchBar'
            value={this.state.query}
            scope={this.state.scope}
            scopes={this.state.reference.scopes}
            loading={this.state.isLoadingSearch}
            handleChange={this._wrappedSearch}
            hasScopes={this.props.hasScopes}
            />;
    }
};
