// Dependencies

let builder = require('focus').component.builder;
let camel = require('lodash/string/camelCase');
let capitalize = require('lodash/string/capitalize');

// Components

let FacetBox = require('./facet-box').component;
let ListActionBar = require('./action-bar').component;
let ListSummary = require('./list-summary').component;
let Results = require('../common/component/results').component;

let BackToTopComponent = require('../../../common/button/back-to-top').component;

// Store

let advancedSearchStore = Focus.search.builtInStore.advancedSearchStore;

// Mixins

let CartridgeBehaviour = require('../../mixin/cartridge-behaviour');
let type = require('focus').component.types;

// Actions

let actionBuilder = Focus.search.actionBuilder;

/**
 * Page mixin of the advanced search.
 * @type {Object}
 */
let AdvancedSearch = {
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
    getInitialState() {
        return (this._getNewStateFromStore());
    },
    /**
     * Register the store listeners
     */
    componentWillMount() {
        ['query', 'scope', 'selected-facets', 'grouping-key', 'sort-by', 'sort-asc'].forEach((node) => {
            this.props.store[`add${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithSearch);
        });
        ['facets', 'results', 'total-count'].forEach((node) => {
            this.props.store[`add${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithoutSearch);
        });
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
    },
    componentDidMount() {
        this._action.search();
    },
    /**
     * Un-register the store listeners
     */
    componentWillUnmount() {
        ['query', 'scope', 'selected-facets', 'grouping-key', 'sort-by', 'sort-asc'].forEach((node) => {
            this.props.store[`remove${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithSearch);
        });
        ['facets', 'results', 'total-count'].forEach((node) => {
            this.props.store[`remove${capitalize(camel(node))}ChangeListener`](this._onStoreChangeWithoutSearch);
        });
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
    _getNewStateFromStore() {
        let query = this.props.store.getQuery();
        let scope = this.props.store.getScope();
        let selectedFacets = this.props.store.getSelectedFacets() || {};
        let groupingKey = this.props.store.getGroupingKey();
        let sortBy = this.props.store.getSortBy();
        let sortAsc = this.props.store.getSortAsc();
        let facets = this.props.store.getFacets();
        let results = this.props.store.getResults();
        let totalCount = this.props.store.getTotalCount();
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
        return (
            <FacetBox
                facets={this.state.facets}
                selectedFacets={this.state.selectedFacets}
                facetConfig={this.props.facetConfig}
                action={this._action}
                scopesConfig={this.props.scopesConfig}
            />
        );
    },
    /**
     * Render the list summary component.
     * @returns {HTML} the rendered component
     */
    _renderListSummary() {
        return (
            <ListSummary
                totalCount={this.state.totalCount}
                query={this.state.query}
                action={this._action}
                scope={this.state.scope}
            />
        );
    },
    /**
     * Render the action bar.
     * @returns {HTML} the rendered component
     */
    _renderActionBar() {
        let groupableColumnList = this.state.facets ? Object.keys(this.state.facets).reduce((result, facetKey) => {
            result[facetKey] = facetKey;
            return result;
        }, {}) : {};
        let selectionAction = (selectionStatus) => {
            this.setState({selectionStatus});
        };
        return (
            <ListActionBar
               selectionStatus={this.state.selectionStatus}
               selectionAction={selectionAction}
               orderableColumnList={this.props.orderableColumnList}
               orderSelected={this.state.sortBy}
               groupableColumnList={groupableColumnList}
               groupSelectedKey={this.state.groupingKey}
               selectedFacets={this.state.selectedFacets}
               operationList={this.props.lineOperationList}
               action={this._action}
            />
        );
    },
    /**
     * Render the results component
     * @return {HTML} the rendered component
     */
    _renderResults() {
        return (
            <Results
                action={this._action}
                store={this.props.store}
                resultsMap={this.state.results}
                totalCount={this.state.totalCount}
                groupComponent={this.props.groupComponent}
                lineComponentMapper={this.props.lineComponentMapper}
                isSelection={this.props.isSelection}
                lineSelectionHandler={this._selectItem}
                lineClickHandler={this._lineClick}
                lineOperationList={this.props.lineOperationList}
                scrollParentSelector={this.props.scrollParentSelector}
                selectionStatus={this.state.selectionStatus}
                groupingKey={this.state.groupingKey}
                resultsFacets={this.state.facets}
                renderSingleGroupDecoration={false}
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
        return (
            <div className="advanced-search" data-focus="advanced-search">
                <div data-focus="facet-container">
                    {this._renderFacetBox()}
                </div>
                <div data-focus="result-container">
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
