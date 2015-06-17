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
            isLoading: false
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
            value={this.props.query}
            scope={this.props.scope}
            scopes={this.state.reference.scopes}
            loading={this.state.isLoadingSearch}
            handleChange={this._wrappedSearch}
            referenceNames={this.props.referenceNames}
            hasScopes={this.props.hasScopes}
            />;
    }
};
