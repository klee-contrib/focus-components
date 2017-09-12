// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
import dispatcher from 'focus-core/dispatcher';
import camel from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';
import isFunction from 'lodash/lang/isFunction';
import reduce from 'lodash/collection/reduce';
// Components
import { component as FacetBox } from './facet-box';
import { component as ListActionBar } from './action-bar';
import { component as ListSummary } from './list-summary';
import { component as Results } from '../common/component/results';
import BackToTopComponent from '../../../components/button-back-to-top';
import DefaultGroupComponent from './group';
// Store
import { advancedSearchStore } from 'focus-core/search/built-in-store';
// Mixins
import CartridgeBehaviour from '../../mixin/cartridge-behaviour';
import type from 'focus-core/component/types';
// Actions
import actionBuilder from 'focus-core/search/action-builder';

/**
* Page mixin of the advanced search.
* @type {Object}
*/
const AdvancedSearch = {
    /**
    * Component's mixins
    * @type {Array}
    */
    mixins: [CartridgeBehaviour],
    /**
    * Display name.
    */
    displayName: 'advanced-search',
    /**
    * Get the default props
    * @return {object} the default props
    */
    getDefaultProps() {
        return {
            action: undefined,
            backToTopComponent: BackToTopComponent,
            callSearchOnMount: true,
            facetConfig: {},
            groupComponent: DefaultGroupComponent,
            hasBackToTop: true,
            isSelection: true,
            lineOperationList: [],
            lineComponentMapper: undefined,
            orderableColumnList: [],
            onLineClick: undefined,
            openedFacetList: {},
            scopesConfig: {},
            scrollParentSelector: undefined,
            service: undefined,
            store: advancedSearchStore
        };
    },
    /**
    * Props validation
    * @type {Object}
    */
    propTypes: {
        action: type('object'),
        backToTopComponent: type('func'),
        callSearchOnMount: type('bool'),
        exportAction: type('func'),
        facetConfig: type('object'),
        groupComponent: type('func'),
        hasBackToTop: type('bool'),
        isSelection: type('bool'),
        lineComponentMapper: type('func'),
        lineOperationList: type(['array', 'object']),
        onLineClick: type('func'),
        orderableColumnList: type(['array', 'object']),
        openedFacetList: type('object'),
        scopesConfig: type('object'),
        scrollParentSelector: type('string'),
        service: type('object'),
        store: type('object')
    },
    /**
    * Get initial state
    * @return {Object} initial state
    */
    getInitialState() {
        return (this._getNewStateFromStore());
    },
    /**
    * Register the store listeners
    */
    componentWillMount() {
        const { store, callSearchOnMount, service } = this.props;
        //listen to search event
        store.on('advanced-search-criterias:change', this._onStoreChangeWithSearch);

        //listen to data changes
        ['facets', 'results', 'total-count'].forEach((node) => {
            store[`add${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithoutSearch);
        });

        // listen to scope change
        store.addScopeChangeListener(this._onScopeChange);

        this._action = this.props.action || actionBuilder({
            service: service,
            identifier: store.identifier,
            getSearchOptions: () => { return store.getValue.call(store); } // Binding the store in the function call
        });
        if (this.props.callSearchOnMount) {
            this._action.search();
        }
    },
    /**
    * Un-register the store listeners
    */
    componentWillUnmount() {
        // remove listeners
        this.props.store.removeListener('advanced-search-criterias:change', this._onStoreChangeWithSearch);
        ['facets', 'results', 'total-count'].forEach((node) => {
            this.props.store[`remove${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithoutSearch);
        });
        this.props.store.removeScopeChangeListener(this._onScopeChange);
    },

    getSelectedItems() {
        const results = this.refs.resultList;
        const selectedItems = reduce(results.refs, (selectedItems, ref) => {
            if (isFunction(ref.getSelectedItems)) {
                selectedItems = selectedItems.concat(ref.getSelectedItems());
            } else if (ref.refs) {
                selectedItems = selectedItems.concat(reduce(ref.refs, (subSelectedItems, subRef) => {
                    if (isFunction(subRef.getSelectedItems)) {
                        subSelectedItems = subSelectedItems.concat(subRef.getSelectedItems());
                    }
                    return subSelectedItems;
                }, []));
            }
            return selectedItems;
        }, []);
        return selectedItems;
    },
    /**
    * Store changed, update the state, trigger a search after update
    */
    _onStoreChangeWithSearch() {
        this.setState(this._getNewStateFromStore(), this._action.search);
    },
    /**
    * Store changed, update the state, do not trigger a search after update
    */
    _onStoreChangeWithoutSearch() {
        this.setState(this._getNewStateFromStore());
    },
    /**
    * Scope changed, need to remove all existing sort.
    */
    _onScopeChange: function _onScopeChange() {
        dispatcher.handleViewAction({
            data: { sortBy: null, sortAsc: null },
            type: 'update',
            identifier: advancedSearchStore.identifier
        }
        );
    },
    /**
    * Compute a state object from the store values.
    * @return {[type]} [description]
    */
    _getNewStateFromStore() {
        const { store } = this.props;
        const query = store.getQuery();
        const scope = store.getScope();
        const selectedFacets = store.getSelectedFacets() || {};
        const groupingKey = store.getGroupingKey();
        const sortBy = store.getSortBy();
        const sortAsc = store.getSortAsc();
        const facets = store.getFacets();
        const results = store.getResults();
        const totalCount = store.getTotalCount();
        const selectionStatus = 'none';
        const hasGrouping = scope !== undefined && scope !== 'ALL';
        return {
            facets,
            groupingKey,
            hasGrouping,
            query,
            selectionStatus,
            scope,
            selectedFacets,
            sortBy,
            sortAsc,
            results,
            totalCount
        };
    },
    /**
    * Export action handler.
    */
    _exportHandler() {
        this.props.exportAction();
    },
    /**
    * Render the facet box.
    * @returns {HTML} the rendered component
    */
    _renderFacetBox() {
        const { facets, selectedFacets } = this.state;
        const { facetConfig, scopesConfig, openedFacetList } = this.props;
        return (
            <FacetBox
                action={this._action}
                facetConfig={facetConfig}
                openedFacetList={openedFacetList}
                facets={facets}
                ref='facetBox'
                scopesConfig={scopesConfig}
                selectedFacets={selectedFacets}
            />
        );
    },
    /**
    * Render the list summary component.
    * @returns {HTML} the rendered component
    */
    _renderListSummary() {
        const { query, scope, totalCount } = this.state;
        return (
            <ListSummary
                action={this._action}
                query={query}
                ref='summary'
                scope={scope}
                totalCount={totalCount}
            />
        );
    },
    /**
    * Render the action bar.
    * @returns {HTML} the rendered component
    */
    _renderActionBar() {
        const { facets, groupingKey, hasGrouping, selectedFacets, selectionStatus, sortBy } = this.state;
        const { isSelection, lineOperationList, orderableColumnList } = this.props;
        const groupableColumnList = facets ? Object.keys(facets).reduce((result, facetKey) => {
            if (Object.keys(facets[facetKey]).length > 1) {
                result[facetKey] = facetKey;
            }
            return result;
        }, {}) : {};
        const selectionAction = (status) => {
            this.setState({ selectionStatus: status });
        };
        return (
            <ListActionBar
                action={this._action}
                groupSelectedKey={groupingKey}
                groupableColumnList={groupableColumnList}
                hasGrouping={hasGrouping}
                isSelection={isSelection}
                operationList={lineOperationList}
                orderSelected={sortBy}
                orderableColumnList={orderableColumnList}
                ref='actionBar'
                selectedFacets={selectedFacets}
                selectionAction={selectionAction}
                selectionStatus={selectionStatus}
            />
        );
    },
    /**
    * Render the results component
    * @return {HTML} the rendered component
    */
    _renderResults() {
        const { groupComponent, isSelection, lineComponentMapper, lineOperationList, scrollParentSelector, store, scopesConfig } = this.props;
        const { groupingKey, facets, results, selectionStatus, totalCount } = this.state;
        return (
            <Results
                action={this._action}
                groupComponent={groupComponent}
                groupingKey={groupingKey}
                isSelection={isSelection}
                lineClickHandler={this._lineClick}
                lineComponentMapper={lineComponentMapper}
                lineOperationList={lineOperationList}
                lineSelectionHandler={this._selectItem}
                ref='resultList'
                renderSingleGroupDecoration={false}
                resultsFacets={facets}
                resultsMap={results}
                scopesConfig={scopesConfig}
                scrollParentSelector={scrollParentSelector}
                selectionStatus={selectionStatus}
                store={store}
                totalCount={totalCount}
            />
        );
    },
    /**
    * Line selection handler
    */
    _selectItem() {
        // count the selected items
        const selectedItemsCount = this.getSelectedItems().length;
        // Count the visible items
        const visibleItemsCount = reduce(this.refs.resultList.refs, (visibleItemsCount, refComponent, refKey) => {
            // Results might be a list (non-grouped search) or groups (grouped search)
            if (refKey.indexOf('list-') === 0) {
                visibleItemsCount += refComponent.props.data.length;
            }
            if (refKey.indexOf('group-') === 0) {
                if (refComponent.props.list.length < refComponent.state.resultsDisplayedCount) {
                    visibleItemsCount += refComponent.props.list.length;
                } else {
                    visibleItemsCount += refComponent.state.resultsDisplayedCount;
                }
            }
            return visibleItemsCount;
        }, 0);
        // By default, the selection status is partial
        let selectionStatus = 'partial';
        // If no item is selected, then the selectionStatus is none
        if (selectedItemsCount === 0) {
            selectionStatus = 'none';
        } else if (selectedItemsCount === visibleItemsCount) {
            // There are as many selected items as visible items, so the selectionStatus is all
            selectionStatus = 'selected';
        }
        this.setState({ selectionStatus });
    },
    /**
    * Action on line click.
    * @param {object} item  the item clicked
    */
    _lineClick(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
    * Render the component
    * @return {HTML} the rendered component
    */
    render() {
        // true if a facet is collapsed
        const facetCollapsedClassName = Object.keys(this.props.openedFacetList).length === 0 ? 'facet-collapsed' : '';
        return (
            <div className='advanced-search' data-focus='advanced-search'>
                <div data-focus='facet-container' className={facetCollapsedClassName}>
                    {this._renderFacetBox()}
                </div>
                <div data-focus='result-container'>
                    {this._renderListSummary()}
                    {this._renderActionBar()}
                    {this._renderResults()}
                </div>
                {this.props.hasBackToTop && <this.props.backToTopComponent />}
            </div>
        );
    }
};

const { mixin, component } = builder(AdvancedSearch);
export { mixin, component };
export default { mixin, component };
