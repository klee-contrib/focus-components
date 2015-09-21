// Mixins

let i18nMixin = require('../../../../common/i18n').mixin;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components

let SearchBar = require('../../../../search/search-bar').component;

// Actions

let actionBuilder = require('focus-core').search.actionBuilder;

// Store

let advancedSearchStore = require('focus-core').search.builtInStore.advancedSearchStore;

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps() {
        return {
            service: undefined,
            store: advancedSearchStore,
            onSearchCriteriaChange: undefined
        };
    },
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._loadReference();
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
        advancedSearchStore.addQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount() {
        advancedSearchStore.removeQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        if (this.props.onSearchCriteriaChange) {
            this.props.onSearchCriteriaChange();
        }
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
