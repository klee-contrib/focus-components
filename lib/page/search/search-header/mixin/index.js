// Mixins

'use strict';

var i18nMixin = require('../../../../common/i18n').mixin;
var referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
var storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components

var SearchBar = require('../../../../search/search-bar').component;

// Actions

var actionBuilder = Focus.search.actionBuilder;

// Store

var advancedSearchStore = Focus.search.builtInStore.advancedSearchStore;

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps: function getDefaultProps() {
        return {
            service: undefined,
            store: advancedSearchStore,
            onSearchCriteriaChange: undefined
        };
    },
    getInitialState: function getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount: function componentWillMount() {
        var _this = this;

        this._loadReference();
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: function getSearchOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
        advancedSearchStore.addQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        advancedSearchStore.removeQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange: function _onSearchCriteriaChange() {
        if (this.props.onSearchCriteriaChange) {
            this.props.onSearchCriteriaChange();
        }
    },
    _SearchBarComponent: function _SearchBarComponent() {
        return React.createElement(SearchBar, {
            ref: 'searchBar',
            scopes: this.state.reference.scopes,
            loading: this.state.isLoading,
            action: this._action,
            store: advancedSearchStore
        });
    }
};