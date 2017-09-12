import React from 'react';

import actionBuilder from 'focus-core/search/action-builder';
import { advancedSearchStore } from 'focus-core/search/built-in-store';

import { component as SearchBar } from '../../../..//search/search-bar';
import referenceBehaviour from '../../../..//common/form/mixin/reference-behaviour';
import storeBehaviour from '../../../..//common/mixin/store-behaviour';

export default {
    mixins: [referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps() {
        return {
            service: undefined,
            store: advancedSearchStore,
            onSearchCriteriaChange: undefined,
            onSearchCriteriaChangeByUser: undefined,
            scopeName: undefined
        };
    },
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => { return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
        this.props.store.addQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillReceiveProps({ store, service, action }) {
        if (store.identifier !== this.props.store.identifier) {
            this._action = action || actionBuilder({
                service: service,
                identifier: store.identifier,
                getSearchOptions: () => { return store.getValue.call(store); } // Binding the store in the function call
            });

            this.props.store.removeQueryChangeListener(this._onSearchCriteriaChange);
            this.props.store.removeScopeChangeListener(this._onSearchCriteriaChange);

            store.addQueryChangeListener(this._onSearchCriteriaChange);
            store.addScopeChangeListener(this._onSearchCriteriaChange);
        }
    },
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        const { onSearchCriteriaChange } = this.props;
        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
    },
    _SearchBarComponent() {
        const { helpTranslationPath, minChar, onSearchCriteriaChangeByUser, placeholder, store, scopeName, keepProperties } = this.props;
        const { isLoading, reference: { [scopeName ? scopeName : 'scopes']: datalist } } = this.state;
        return (
            <SearchBar
                action={this._action}
                helpTranslationPath={helpTranslationPath}
                loading={isLoading}
                minChar={minChar}
                placeholder={placeholder}
                ref='searchBar'
                scopes={datalist}
                store={store}
                onSearchCriteriaChangeByUser={onSearchCriteriaChangeByUser}
                keepProperties={keepProperties}
            />
        );
    }
};