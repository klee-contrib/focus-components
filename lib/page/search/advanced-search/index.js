// Dependencies

'use strict';

var builder = require('focus').component.builder;

var _require = require('lodash/string');

var camel = _require.camelCase;

var _require2 = require('lodash/string');

var capitalize = _require2.capitalize;

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
            orderableColumnList: [],
            lineOperationList: {},
            exportAction: {},
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
    /**
     * Get initial state
     * @return {Object} initial state
     */
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
        this._action.search();
    },
    componentDidMount: function componentDidMount() {},
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
    /**
     * Compute a state object from the store values.
     * @return {[type]} [description]
     */
    _getNewStateFromStore: function _getNewStateFromStore() {
        var store = this.props.store;

        var query = store.getQuery();
        var scope = store.getScope();
        var selectedFacets = store.getSelectedFacets() || {};
        var groupingKey = store.getGroupingKey();
        var sortBy = store.getSortBy();
        var sortAsc = store.getSortAsc();
        var facets = store.getFacets();
        var results = store.getResults();
        var totalCount = store.getTotalCount();
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
        var _state = this.state;
        var facets = _state.facets;
        var selectedFacets = _state.selectedFacets;
        var _props = this.props;
        var facetConfig = _props.facetConfig;
        var scopesConfig = _props.scopesConfig;

        return React.createElement(FacetBox, {
            action: this._action,
            facetConfig: facetConfig,
            facets: facets,
            scopesConfig: scopesConfig,
            selectedFacets: selectedFacets
        });
    },
    /**
    * Render the list summary component.
    * @returns {HTML} the rendered component
    */
    _renderListSummary: function _renderListSummary() {
        var _state2 = this.state;
        var query = _state2.query;
        var scope = _state2.scope;
        var totalCount = _state2.totalCount;

        return React.createElement(ListSummary, {
            action: this._action,
            query: query,
            scope: scope,
            totalCount: totalCount
        });
    },
    /**
    * Render the action bar.
    * @returns {HTML} the rendered component
    */
    _renderActionBar: function _renderActionBar() {
        var _this3 = this;

        var _state3 = this.state;
        var facets = _state3.facets;
        var groupingKey = _state3.groupingKey;
        var selectedFacets = _state3.selectedFacets;
        var selectionStatus = _state3.selectionStatus;
        var sortBy = _state3.sortBy;
        var _props2 = this.props;
        var lineOperationList = _props2.lineOperationList;
        var orderableColumnList = _props2.orderableColumnList;

        var groupableColumnList = facets ? Object.keys(facets).reduce(function (result, facetKey) {
            result[facetKey] = facetKey;
            return result;
        }, {}) : {};
        var selectionAction = function selectionAction(status) {
            _this3.setState({ selectionStatus: status });
        };
        return React.createElement(ListActionBar, {
            action: this._action,
            groupSelectedKey: groupingKey,
            groupableColumnList: groupableColumnList,
            operationList: lineOperationList,
            orderSelected: sortBy,
            orderableColumnList: orderableColumnList,
            selectedFacets: selectedFacets,
            selectionAction: selectionAction,
            selectionStatus: selectionStatus
        });
    },
    /**
    * Render the results component
    * @return {HTML} the rendered component
    */
    _renderResults: function _renderResults() {
        var _props3 = this.props;
        var groupComponent = _props3.groupComponent;
        var isSelection = _props3.isSelection;
        var lineComponentMapper = _props3.lineComponentMapper;
        var lineOperationList = _props3.lineOperationList;
        var scrollParentSelector = _props3.scrollParentSelector;
        var store = _props3.store;
        var _state4 = this.state;
        var groupingKey = _state4.groupingKey;
        var facets = _state4.facets;
        var results = _state4.results;
        var selectionStatus = _state4.selectionStatus;
        var totalCount = _state4.totalCount;

        return React.createElement(Results, {
            action: this._action,
            groupComponent: groupComponent,
            groupingKey: groupingKey,
            isSelection: isSelection,
            lineClickHandler: this._lineClick,
            lineComponentMapper: lineComponentMapper,
            lineOperationList: lineOperationList,
            lineSelectionHandler: this._selectItem,
            renderSingleGroupDecoration: false,
            resultsFacets: facets,
            resultsMap: results,
            scrollParentSelector: scrollParentSelector,
            selectionStatus: selectionStatus,
            store: store,
            totalCount: totalCount
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
        var style = this.props.style;

        return React.createElement(
            'div',
            { className: 'advanced-search', 'data-focus': 'advanced-search' },
            React.createElement(
                'div',
                { 'data-focus': 'facet-container', style: style.facets },
                this._renderFacetBox()
            ),
            React.createElement(
                'div',
                { 'data-focus': 'result-container', style: style.results },
                this._renderListSummary(),
                this._renderActionBar(),
                this._renderResults()
            ),
            this.props.hasBackToTop && React.createElement(this.props.backToTopComponent, null)
        );
    }
};

module.exports = builder(AdvancedSearch);