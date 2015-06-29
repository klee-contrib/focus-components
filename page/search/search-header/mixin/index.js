// Mixins

let i18nMixin = require('../../../../common/i18n').mixin;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components

let SearchBar = require('../../../../search/search-bar').component;

// Actions

let actionBuilder = require('../../../../search/action-builder');

// Store

let advancedSearchStore = Focus.search.builtInStore.advancedSearchStore;

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._loadReference();
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: 'ADVANCED_SEARCH'
        });
        advancedSearchStore.addQueryChangeListener(this._triggerSearch);
        advancedSearchStore.addScopeChangeListener(this._triggerSearch);
    },
    componentWillUnmount() {
        advancedSearchStore.removeQueryChangeListener(this._triggerSearch);
        advancedSearchStore.removeScopeChangeListener(this._triggerSearch);
    },
    _triggerSearch() {
        this._action.search();
    },
    _SearchBarComponent() {
        return <SearchBar
            ref='searchBar'
            scopes={this.state.reference.scopes}
            loading={this.state.isLoading}
            action={this._action}
            store={advancedSearchStore}
            />;
    }
};
