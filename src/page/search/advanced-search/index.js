// Dependencies

const builder = require('focus').component.builder;
const camel = require('lodash/string/camelCase');
const capitalize = require('lodash/string/capitalize');

// Components

const FacetBox = require('./facet-box').component;
const ListActionBar = require('./action-bar').component;
const ListSummary = require('./list-summary').component;
const Results = require('../common/component/results').component;

const BackToTopComponent = require('../../../common/button/back-to-top').component;

// Store

const advancedSearchStore = Focus.search.builtInStore.advancedSearchStore;

// Mixins

const CartridgeBehaviour = require('../../mixin/cartridge-behaviour');
const type = require('focus').component.types;

// Actions

const actionBuilder = Focus.search.actionBuilder;

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
    /**
     * Compute a state object from the store values.
     * @return {[type]} [description]
     */
    _getNewStateFromStore() {
        const query = this.props.store.getQuery();
        const scope = this.props.store.getScope();
        const selectedFacets = this.props.store.getSelectedFacets() || {};
        const groupingKey = this.props.store.getGroupingKey();
        const sortBy = this.props.store.getSortBy();
        const sortAsc = this.props.store.getSortAsc();
        const facets = this.props.store.getFacets();
        const results = this.props.store.getResults();
        const totalCount = this.props.store.getTotalCount();
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
                action={this._action}
                facetConfig={this.props.facetConfig}
                facets={this.state.facets}
                scopesConfig={this.props.scopesConfig}
                selectedFacets={this.state.selectedFacets}
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
                action={this._action}
                query={this.state.query}
                scope={this.state.scope}
                totalCount={this.state.totalCount}
                />
        );
    },
    /**
    * Render the action bar.
    * @returns {HTML} the rendered component
    */
    _renderActionBar() {
        const groupableColumnList = this.state.facets ? Object.keys(this.state.facets).reduce((result, facetKey) => {
            result[facetKey] = facetKey;
            return result;
        }, {}) : {};
        const selectionAction = (selectionStatus) => {
            this.setState({selectionStatus});
        };
        return (
            <ListActionBar
                action={this._action}
                groupSelectedKey={this.state.groupingKey}
                groupableColumnList={groupableColumnList}
                operationList={this.props.lineOperationList}
                orderSelected={this.state.sortBy}
                orderableColumnList={this.props.orderableColumnList}
                selectedFacets={this.state.selectedFacets}
                selectionAction={selectionAction}
                selectionStatus={this.state.selectionStatus}
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
                groupComponent={this.props.groupComponent}
                groupingKey={this.state.groupingKey}
                isSelection={this.props.isSelection}
                lineClickHandler={this._lineClick}
                lineComponentMapper={this.props.lineComponentMapper}
                lineOperationList={this.props.lineOperationList}
                lineSelectionHandler={this._selectItem}
                renderSingleGroupDecoration={false}
                resultsFacets={this.state.facets}
                resultsMap={this.state.results}
                scrollParentSelector={this.props.scrollParentSelector}
                selectionStatus={this.state.selectionStatus}
                store={this.props.store}
                totalCount={this.state.totalCount}
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
