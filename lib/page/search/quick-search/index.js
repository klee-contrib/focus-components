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
            scrollParentSelector: undefined
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
        var _this = this;

        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: function getSearchOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
        this._loadReference();
        this.props.store.addQueryChangeListener(this._triggerSearch);
        this.props.store.addScopeChangeListener(this._triggerSearch);
        this.props.store.addResultsChangeListener(this._onResultsChange);
    },
    /**
     * Unregister the store listeners
     */
    componentWillUnmount: function componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._triggerSearch);
        this.props.store.removeScopeChangeListener(this._triggerSearch);
        this.props.store.removeResultsChangeListener(this._onResultsChange);
    },
    _triggerSearch: function _triggerSearch() {
        this._action.search();
    },
    /**
     * Results change handler
     */
    _onResultsChange: function _onResultsChange() {
        var resultsMap = this.props.store.getResults();
        var facets = this.props.store.getFacets();
        var totalCount = this.props.store.getTotalCount();
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
        return React.createElement(SearchBar, {
            'data-focus': 'search-bar',
            ref: 'searchBar',
            scopes: this.state.reference.scopes,
            loading: this.state.isLoading,
            action: this._action,
            store: this.props.store
        });
    },
    /**
     * redner the results
     * @returns {HTML} the rendered component
     */
    _renderResults: function _renderResults() {
        return React.createElement(Results, {
            resultsMap: this.state.resultsMap,
            totalCount: this.state.totalCount,
            resultsFacets: this.state.facets,
            groupComponent: this.props.groupComponent,
            lineComponentMapper: this.props.lineComponentMapper,
            isSelection: false,
            lineClickHandler: this._lineClickHandler,
            lineOperationList: this.props.lineOperationList,
            groupingKey: this.props.scopeFacetKey,
            initialRowsCount: this.props.groupMaxRows,
            action: this._action,
            scrollParentSelector: this.props.scrollParentSelector
        });
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        return React.createElement(
            'div',
            { className: 'search-panel', 'data-focus': 'quick-search' },
            this._renderSearchBar(),
            this._renderResults()
        );
    }
};

module.exports = builder(QuickSearchComponent);