// Dependencies
import PropTypes from 'prop-types';

import React from 'react';
import builder from 'focus-core/component/builder';
// Components
import { component as DefaultSearchBar } from '../../../search/search-bar';
import { component as Results } from '../common/component/results';
import DefaultGroupComponent from './group';
// Mixins
import referenceBehaviour from '../../../common/form/mixin/reference-behaviour';
import storeBehaviour from '../../../common/mixin/store-behaviour';
// Actions
import actionBuilder from 'focus-core/search/action-builder';
// Stores
import { quickSearchStore } from 'focus-core/search/built-in-store';

/**
* General search mixin.
* Contains a search bar, and a results list.
* @type {Object}
*/
const QuickSearchComponent = {
    /**
    * Component's mixins
    * @type {Array}
    */
    mixins: [referenceBehaviour, storeBehaviour],
    /**
    * Tag name.
    */
    displayName: 'QuickSearch',
    /**
    * Reference names to be fetched by the reference behaviour
    * @type {Array}
    */
    referenceNames: ['scopes'],
    /**
    * Get the default props
    * @return {object} the default props
    */
    getDefaultProps() {
        return {
            action: undefined,
            groupComponent: DefaultGroupComponent,
            groupMaxRows: undefined,
            lineComponentMapper: undefined,
            lineOperationList: undefined,
            onLineClick: undefined,
            scopesConfig: {},
            scopeFacetKey: 'FCT_SCOPE',
            scopeSelectionHandler: this._scopeSelectionHandler,
            scrollParentSelector: undefined,
            SearchBar: DefaultSearchBar,
            service: undefined,
            store: quickSearchStore
        };
    },
    /**
    * Prop validation
    * @type {Object}
    */
    propTypes: {
        action: PropTypes.object,
        groupComponent: PropTypes.func,
        groupMaxRows: PropTypes.number,
        lineComponentMapper: PropTypes.func,
        onLineClick: PropTypes.func,
        scopesConfig: PropTypes.object,
        scopeFacetKey: PropTypes.string,
        scopeSelectionHandler: PropTypes.func,
        service: PropTypes.object,
        store: PropTypes.object,
        showAllHandler: PropTypes.func
    },
    /**
    * Register the store listeners
    */
    componentWillMount() {
        const { action, service, store } = this.props;
        this._action = action || actionBuilder({
            service: service,
            identifier: store.identifier,
            getSearchOptions: () => { return store.getValue.call(store); } // Binding the store in the function call
        });

        store.on('quick-search-criterias:change', this._triggerSearch);
        // store.addQueryChangeListener(this._triggerSearch);
        // store.addScopeChangeListener(this._triggerSearch);
        store.addResultsChangeListener(this._onResultsChange);
    },
    /**
    * Unregister the store listeners
    */
    componentWillUnmount() {
        const { store } = this.props;
        store.removeListener('quick-search-criterias:change', this._triggerSearch);
        // store.removeQueryChangeListener(this._triggerSearch);
        // store.removeScopeChangeListener(this._triggerSearch);
        store.removeResultsChangeListener(this._onResultsChange);
    },
    /**
    * Trigger search
    */
    _triggerSearch() {
        this._action.search();
    },
    /**
    * Results change handler
    */
    _onResultsChange() {
        const { store } = this.props;
        const resultsMap = store.getResults();
        const facets = store.getFacets();
        const totalCount = store.getTotalCount();
        this.setState({ resultsMap, facets, totalCount });
    },
    /**
    * Action on line click.
    * @param {object} item  the item clicked
    */
    _lineClickHandler(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
    * redner the SearchBar
    * @returns {HTML} the rendered component
    */
    _renderSearchBar() {
        const { placeholder, SearchBar, store } = this.props;
        const { isLoading, reference: { scopes } } = this.state;
        return (
            <SearchBar
                action={this._action}
                data-focus='search-bar'
                loading={isLoading}
                placeholder={placeholder}
                ref='searchBar'
                scopes={scopes}
                store={store}
            />
        );
    },
    /**
    * redner the results
    * @returns {HTML} the rendered component
    */
    _renderResults() {
        // Adding 'action' in this.props destructuring here prevent the fact that '...otherProps' consider the props 'action' in otherProps.
        // It didn't give 'this._action' to the 'action' props without doing it
        const { action, groupComponent, groupMaxRows, lineComponentMapper, lineOperationList, scrollParentSelector, scopeFacetKey, store, scopesConfig, ...otherProps } = this.props;
        const { facets, resultsMap, totalCount } = this.state;
        return (
            <Results
                action={this._action}
                groupComponent={groupComponent}
                groupingKey={scopeFacetKey}
                initialRowsCount={groupMaxRows}
                isSelection={false}
                lineClickHandler={this._lineClickHandler}
                lineComponentMapper={lineComponentMapper}
                lineOperationList={lineOperationList}
                resultsFacets={facets}
                resultsMap={resultsMap}
                scopesConfig={scopesConfig}
                scrollParentSelector={scrollParentSelector}
                store={store}
                totalCount={totalCount}
                {...otherProps}
            />
        );
    },
    /**
    * Render the component
    * @return {HTML} the rendered component
    */
    render() {

        return (
            <div data-focus='quick-search'>
                <div data-focus='quick-search-bar'>
                    {this._renderSearchBar()}
                </div>
                <div data-focus='quick-search-results'>
                    {this._renderResults()}
                </div>
            </div>
        );
    }
};

const { mixin, component } = builder(QuickSearchComponent);
export { mixin, component };
export default { mixin, component };