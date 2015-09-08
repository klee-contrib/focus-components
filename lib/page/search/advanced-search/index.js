// Dependencies

'use strict';

var builder = require('focus').component.builder;
var camel = require('lodash/string/camelCase');
var capitalize = require('lodash/string/capitalize');

// Components

var FacetBox = require('./facet-box').component;
var ListActionBar = require('./action-bar').component;
var ListSummary = require('./list-summary').component;
var Results = require('../common/component/results').component;

var BackToTopComponent = require('../../../common/button/back-to-top').component;

// Store

var advancedSearchStore = Focus.search.builtInStore.advancedSearchStore;

// Mixins

var CartridgeBehaviour = require('../../mixin/cartridge-behaviour');
var type = require('focus').component.types;

// Actions

var actionBuilder = Focus.search.actionBuilder;

/**
 * Page mixin of the advanced search.
 * @type {Object}
 */
var AdvancedSearch = {
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
    getDefaultProps: function getDefaultProps() {
        return {
            facetConfig: {},
            scopesConfig: {},
            isSelection: true,
            hasBackToTop: true,
            backToTopComponent: BackToTopComponent,
            store: advancedSearchStore,
            action: undefined,
            service: undefined,
            orderableColumnList: {},
            lineOperationList: {},
            exportAction: {},
            groupComponent: undefined,
            lineComponentMapper: undefined,
            scrollParentSelector: undefined,
            onLineClick: undefined
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
        backToTopComponent: type('object'),
        store: type('object'),
        action: type('object'),
        service: type('object'),
        orderableColumnList: type('object'),
        lineOperationList: type('object'),
        exportAction: type('func'),
        groupComponent: type('object'),
        lineComponentMapper: type('func'),
        scrollParentSelector: type('string'),
        onLineClick: type('func')
    },
    getInitialState: function getInitialState() {
        return this._getNewStateFromStore();
    },
    /**
     * Register the store listeners
     */
    componentWillMount: function componentWillMount() {
        var _this = this;

        ['query', 'scope', 'selected-facets', 'grouping-key', 'sort-by', 'sort-asc'].forEach(function (node) {
            _this.props.store['add' + capitalize(camel(node)) + 'ChangeListener'](_this._onStoreChangeWithSearch);
        });
        ['facets', 'results', 'total-count'].forEach(function (node) {
            _this.props.store['add' + capitalize(camel(node)) + 'ChangeListener'](_this._onStoreChangeWithoutSearch);
        });
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: function getSearchOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
    },
    componentDidMount: function componentDidMount() {
        this._action.search();
    },
    /**
     * Un-register the store listeners
     */
    componentWillUnmount: function componentWillUnmount() {
        var _this2 = this;

        ['query', 'scope', 'selected-facets', 'grouping-key', 'sort-by', 'sort-asc'].forEach(function (node) {
            _this2.props.store['remove' + capitalize(camel(node)) + 'ChangeListener'](_this2._onStoreChangeWithSearch);
        });
        ['facets', 'results', 'total-count'].forEach(function (node) {
            _this2.props.store['remove' + capitalize(camel(node)) + 'ChangeListener'](_this2._onStoreChangeWithoutSearch);
        });
    },
    /**
     * Store changed, update the state, trigger a search after update
     */
    _onStoreChangeWithSearch: function _onStoreChangeWithSearch() {
        this.setState(this._getNewStateFromStore(), this._action.search);
    },
    /**
     * Store changed, update the state, do not trigger a search after update
     */
    _onStoreChangeWithoutSearch: function _onStoreChangeWithoutSearch() {
        this.setState(this._getNewStateFromStore());
    },
    _getNewStateFromStore: function _getNewStateFromStore() {
        var query = this.props.store.getQuery();
        var scope = this.props.store.getScope();
        var selectedFacets = this.props.store.getSelectedFacets() || {};
        var groupingKey = this.props.store.getGroupingKey();
        var sortBy = this.props.store.getSortBy();
        var sortAsc = this.props.store.getSortAsc();
        var facets = this.props.store.getFacets();
        var results = this.props.store.getResults();
        var totalCount = this.props.store.getTotalCount();
        return { query: query, scope: scope, selectedFacets: selectedFacets, groupingKey: groupingKey, sortBy: sortBy, sortAsc: sortAsc, facets: facets, results: results, totalCount: totalCount };
    },
    /**
     * Export action handler.
     */
    _exportHandler: function _exportHandler() {
        this.props.exportAction();
    },
    /**
     * Render the facet box.
     * @returns {HTML} the rendered component
     */
    _renderFacetBox: function _renderFacetBox() {
        return React.createElement(FacetBox, {
            facets: this.state.facets,
            selectedFacets: this.state.selectedFacets,
            facetConfig: this.props.facetConfig,
            action: this._action,
            scopesConfig: this.props.scopesConfig
        });
    },
    /**
     * Render the list summary component.
     * @returns {HTML} the rendered component
     */
    _renderListSummary: function _renderListSummary() {
        return React.createElement(ListSummary, {
            totalCount: this.state.totalCount,
            query: this.state.query,
            action: this._action,
            scope: this.state.scope
        });
    },
    /**
     * Render the action bar.
     * @returns {HTML} the rendered component
     */
    _renderActionBar: function _renderActionBar() {
        var _this3 = this;

        var groupableColumnList = this.state.facets ? Object.keys(this.state.facets).reduce(function (result, facetKey) {
            result[facetKey] = facetKey;
            return result;
        }, {}) : {};
        var selectionAction = function selectionAction(selectionStatus) {
            _this3.setState({ selectionStatus: selectionStatus });
        };
        return React.createElement(ListActionBar, {
            selectionStatus: this.state.selectionStatus,
            selectionAction: selectionAction,
            orderableColumnList: this.props.orderableColumnList,
            orderSelected: this.state.sortBy,
            groupableColumnList: groupableColumnList,
            groupSelectedKey: this.state.groupingKey,
            selectedFacets: this.state.selectedFacets,
            operationList: this.props.lineOperationList,
            action: this._action
        });
    },
    /**
     * Render the results component
     * @return {HTML} the rendered component
     */
    _renderResults: function _renderResults() {
        return React.createElement(Results, {
            action: this._action,
            store: this.props.store,
            resultsMap: this.state.results,
            totalCount: this.state.totalCount,
            groupComponent: this.props.groupComponent,
            lineComponentMapper: this.props.lineComponentMapper,
            isSelection: this.props.isSelection,
            lineSelectionHandler: this._selectItem,
            lineClickHandler: this._lineClick,
            lineOperationList: this.props.lineOperationList,
            scrollParentSelector: this.props.scrollParentSelector,
            selectionStatus: this.state.selectionStatus,
            groupingKey: this.state.groupingKey,
            resultsFacets: this.state.facets,
            renderSingleGroupDecoration: false
        });
    },
    /**
     * Line selection handler
     */
    _selectItem: function _selectItem() {
        this.setState({ selectionStatus: 'partial' });
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick: function _lineClick(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        return React.createElement(
            'div',
            { className: 'advanced-search', 'data-focus': 'advanced-search' },
            React.createElement(
                'div',
                { 'data-focus': 'facet-container' },
                this._renderFacetBox()
            ),
            React.createElement(
                'div',
                { 'data-focus': 'result-container' },
                this._renderListSummary(),
                this._renderActionBar(),
                this._renderResults()
            ),
            this.props.hasBackToTop && React.createElement(this.props.backToTopComponent, null)
        );
    }
};

module.exports = builder(AdvancedSearch);