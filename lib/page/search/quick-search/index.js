// Dependencies

'use strict';

var type = require('focus').component.types;
var builder = require('focus').component.builder;

// Components

var SearchBar = require('../../../search/search-bar').component;
var Results = require('../common/component/results').component;

// Mixins

var referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
var storeBehaviour = require('../../../common/mixin/store-behaviour');

// Actions

var actionBuilder = Focus.search.actionBuilder;

// Stores

var quickSearchStore = Focus.search.builtInStore.quickSearchStore;

/**
 * General search mixin.
 * Contains a search bar, and a results list.
 * @type {Object}
 */
var QuickSearchComponent = {
    /**
     * Component's mixins
     * @type {Array}
     */
    mixins: [referenceBehaviour, storeBehaviour],
    /**
     * Tag name.
     */
    displayName: 'quick-search',
    /**
     * Reference names to be fetched by the reference behaviour
     * @type {Array}
     */
    referenceNames: ['scopes'],
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            scopeSelectionHandler: this._scopeSelectionHandler,
            store: quickSearchStore,
            scopeFacetKey: 'FCT_SCOPE',
            lineComponentMapper: undefined,
            lineOperationList: undefined,
            groupComponent: undefined,
            service: undefined,
            action: undefined,
            onLineClick: undefined,
            groupMaxRows: undefined,
            scrollParentSelector: undefined,
            style: require('./style')
        };
    },
    /**
     * Prop validation
     * @type {Object}
     */
    propTypes: {
        scopeSelectionHandler: type('func'),
        store: type('object'),
        scopeFacetKey: type('string'),
        lineComponentMapper: type('func'),
        groupComponent: type('object'),
        service: type('object'),
        action: type('object'),
        onLineClick: type('func'),
        groupMaxRows: type('number')
    },
    /**
     * Register the store listeners
     */
    componentWillMount: function componentWillMount() {
        var _props = this.props;
        var action = _props.action;
        var service = _props.service;
        var store = _props.store;

        this._action = action || actionBuilder({
            service: service,
            identifier: store.identifier,
            getSearchOptions: function getSearchOptions() {
                return store.getValue.call(store);
            } // Binding the store in the function call
        });
        this._loadReference();
        store.addQueryChangeListener(this._triggerSearch);
        store.addScopeChangeListener(this._triggerSearch);
        store.addResultsChangeListener(this._onResultsChange);
    },
    /**
     * Unregister the store listeners
     */
    componentWillUnmount: function componentWillUnmount() {
        var store = this.props.store;

        store.removeQueryChangeListener(this._triggerSearch);
        store.removeScopeChangeListener(this._triggerSearch);
        store.removeResultsChangeListener(this._onResultsChange);
    },
    /**
     * Trigger search
     */
    _triggerSearch: function _triggerSearch() {
        this._action.search();
    },
    /**
     * Results change handler
     */
    _onResultsChange: function _onResultsChange() {
        var store = this.props.store;

        var resultsMap = store.getResults();
        var facets = store.getFacets();
        var totalCount = store.getTotalCount();
        this.setState({ resultsMap: resultsMap, facets: facets, totalCount: totalCount });
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClickHandler: function _lineClickHandler(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
     * redner the SearchBar
     * @returns {HTML} the rendered component
     */
    _renderSearchBar: function _renderSearchBar() {
        var store = this.props.store;
        var _state = this.state;
        var isLoading = _state.isLoading;
        var scopes = _state.reference.scopes;

        return React.createElement(SearchBar, {
            action: this._action,
            'data-focus': 'search-bar',
            loading: isLoading,
            ref: 'searchBar',
            scopes: scopes,
            store: store
        });
    },
    /**
     * redner the results
     * @returns {HTML} the rendered component
     */
    _renderResults: function _renderResults() {
        var _props2 = this.props;
        var groupComponent = _props2.groupComponent;
        var groupMaxRows = _props2.groupMaxRows;
        var lineComponentMapper = _props2.lineComponentMapper;
        var lineOperationList = _props2.lineOperationList;
        var scrollParentSelector = _props2.scrollParentSelector;
        var scopeFacetKey = _props2.scopeFacetKey;
        var _state2 = this.state;
        var facets = _state2.facets;
        var resultsMap = _state2.resultsMap;
        var totalCount = _state2.totalCount;

        return React.createElement(Results, {
            action: this._action,
            groupComponent: groupComponent,
            groupingKey: scopeFacetKey,
            initialRowsCount: groupMaxRows,
            isSelection: false,
            lineClickHandler: this._lineClickHandler,
            lineComponentMapper: lineComponentMapper,
            lineOperationList: lineOperationList,
            resultsFacets: facets,
            resultsMap: resultsMap,
            scrollParentSelector: scrollParentSelector,
            totalCount: totalCount
        });
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var style = this.props.style;

        return React.createElement(
            'div',
            { 'data-focus': 'quick-search' },
            React.createElement(
                'div',
                null,
                this._renderSearchBar()
            ),
            React.createElement(
                'div',
                { style: style.results },
                this._renderResults()
            )
        );
    }
};

module.exports = builder(QuickSearchComponent);