import React from 'react';
import referenceBehaviour from '../../../../common/form/mixin/reference-behaviour';
import storeBehaviour from '../../../../common/mixin/store-behaviour';

// Components
import {component as SearchBar} from '../../../../search/search-bar';

// Actions
import actionBuilder from 'focus-core/search/action-builder';

// Store
import {advancedSearchStore} from 'focus-core/search/built-in-store';

export default {
    mixins: [referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps() {
        return {
            service: undefined,
            store: advancedSearchStore,
            onSearchCriteriaChange: undefined,
            onSearchCriteriaChangeByUser: undefined
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
        this.props.store.addQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onSearchCriteriaChange);
        this.props.store.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        const {onSearchCriteriaChange} = this.props;
        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
    },
    _SearchBarComponent() {
        const {helpTranslationPath, minChar, onSearchCriteriaChangeByUser, placeholder, store} = this.props;
        const {isLoading, reference: {scopes}} = this.state;
        return (
            <SearchBar
                action={this._action}
                helpTranslationPath={helpTranslationPath}
                loading={isLoading}
                minChar={minChar}
                placeholder={placeholder}
                ref='searchBar'
                scopes={scopes}
                store={store}
                onSearchCriteriaChangeByUser={onSearchCriteriaChangeByUser}
            />
        );
    }
};
