// Dependencies
const React = require('react');
import builder from 'focus-core/component/builder';
import dispatcher from 'focus-core/dispatcher';
const {camelCase: camel} = require('lodash/string');
const {capitalize} = require('lodash/string');
const {isFunction} = require('lodash/lang');
const {reduce} = require('lodash/collection');

// Components

const FacetBox = require('./facet-box').component;
const ListActionBar = require('./action-bar').component;
const ListSummary = require('./list-summary').component;
const Results = require('../common/component/results').component;

const BackToTopComponent = require('../../../common/button/back-to-top').component;

// Store

import {advancedSearchStore} from 'focus-core/search/built-in-store';

// Mixins

const CartridgeBehaviour = require('../../mixin/cartridge-behaviour');
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
            facetConfig: {},
            scopesConfig: {},
            isSelection: true,
            hasBackToTop: true,
            backToTopComponent: BackToTopComponent,
            store: advancedSearchStore,
            action: undefined,
            service: undefined,
            orderableColumnList: [],
            lineOperationList: [],
            openedFacetList: {},
            groupComponent: undefined,
            lineComponentMapper: undefined,
            scrollParentSelector: undefined,
            onLineClick: undefined,
            style: require('./style')
        };
    },
    /**
    * Props validation
    * @type {Object}
    */
    propTypes: {
        scopesConfig: type('object'),
        facetConfig: type('object'),
        isSelection: type('bool'),
        hasBackToTop: type('bool'),
        backToTopComponent: type('func'),
        store: type('object'),
        action: type('object'),
        service: type('object'),
        openedFacetList: type('object'),
        orderableColumnList: type(['array', 'object']),
        lineOperationList: type(['array', 'object']),
        exportAction: type('func'),
        groupComponent: type('func'),
        lineComponentMapper: type('func'),
        scrollParentSelector: type('string'),
        onLineClick: type('func')
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
        //listen to search event
        this.props.store.on('advanced-search-criterias:change', this._onStoreChangeWithSearch);

        //listen to data changes
        ['facets', 'results', 'total-count'].forEach((node) => {
            this.props.store[`add${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithoutSearch);
        });

        // listen to scope change
        this.props.store.addScopeChangeListener(this._onScopeChange);

        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
        this._action.search();
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
        dispatcher.handleViewAction({data:{sortBy: null, sortAsc: null},
            type: 'update',
            identifier: advancedSearchStore.identifier});
    },
    /**
     * Compute a state object from the store values.
     * @return {[type]} [description]
     */
    _getNewStateFromStore() {
        const {store} = this.props;
        const query = store.getQuery();
        const scope = store.getScope();
        const selectedFacets = store.getSelectedFacets() || {};
        const groupingKey = store.getGroupingKey();
        const sortBy = store.getSortBy();
        const sortAsc = store.getSortAsc();
        const facets = store.getFacets();
        const results = store.getResults();
        const totalCount = store.getTotalCount();
        return {query, scope, selectedFacets, groupingKey, sortBy, sortAsc, facets, results, totalCount};
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
        const {facets, selectedFacets} = this.state;
        const {facetConfig, scopesConfig, openedFacetList} = this.props;
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
        const {query, scope, totalCount} = this.state;
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
        const {facets, groupingKey, selectedFacets, selectionStatus, sortBy} = this.state;
        const {isSelection, lineOperationList, orderableColumnList} = this.props;
        const groupableColumnList = facets ? Object.keys(facets).reduce((result, facetKey) => {
            if (Object.keys(facets[facetKey]).length > 1) {
                result[facetKey] = facetKey;
            }
            return result;
        }, {}) : {};
        const selectionAction = (status) => {
            this.setState({selectionStatus: status});
        };
        return (
            <ListActionBar
                action={this._action}
                groupSelectedKey={groupingKey}
                groupableColumnList={groupableColumnList}
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
        const {groupComponent, isSelection, lineComponentMapper, lineOperationList, scrollParentSelector, store} = this.props;
        const {groupingKey, facets, results, selectionStatus, totalCount} = this.state;
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
        this.setState({selectionStatus: 'partial'});
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
                {this.props.hasBackToTop && <this.props.backToTopComponent/>}
            </div>
        );
    }
};

module.exports = builder(AdvancedSearch);
