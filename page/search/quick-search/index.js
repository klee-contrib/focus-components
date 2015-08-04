// Dependencies

let type = require('focus').component.types;
let builder = require('focus').component.builder;

// Components

let SearchBar = require('../../../search/search-bar').component;
let Results = require('../common/component/results').component;

// Mixins

let referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../common/mixin/store-behaviour');

// Actions

let actionBuilder = Focus.search.actionBuilder;

// Stores

let quickSearchStore = Focus.search.builtInStore.quickSearchStore;

/**
 * General search mixin.
 * Contains a search bar, and a results list.
 * @type {Object}
 */
let QuickSearchComponent = {
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
    getDefaultProps() {
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
        scopeSelectionHandler: type('function'),
        store: type('object'),
        scopeFacetKey: type('string'),
        lineComponentMapper: type('function'),
        groupComponent: type('object'),
        service: type('object'),
        action: type('object'),
        onLineClick: type('function'),
        groupMaxRows: type('number')
    },
    /**
     * Register the store listeners
     */
    componentWillMount() {
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
        this._loadReference();
        this.props.store.addQueryChangeListener(this._triggerSearch);
        this.props.store.addScopeChangeListener(this._triggerSearch);
        this.props.store.addResultsChangeListener(this._onResultsChange);
    },
    /**
     * Unregister the store listeners
     */
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._triggerSearch);
        this.props.store.removeScopeChangeListener(this._triggerSearch);
        this.props.store.removeResultsChangeListener(this._onResultsChange);
    },
    _triggerSearch() {
        this._action.search();
    },
    /**
     * Results change handler
     */
    _onResultsChange() {
        let resultsMap = this.props.store.getResults();
        let facets = this.props.store.getFacets();
        let totalCount = this.props.store.getTotalCount();
        this.setState({resultsMap, facets, totalCount});
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
        return (
            <SearchBar
                data-focus='search-bar'
                ref='searchBar'
                scopes={this.state.reference.scopes}
                loading={this.state.isLoading}
                action={this._action}
                store={this.props.store}
                />
        );
    },
    /**
     * redner the results
     * @returns {HTML} the rendered component
     */
    _renderResults() {
        return (
            <Results
                resultsMap={this.state.resultsMap}
                totalCount={this.state.totalCount}
                resultsFacets={this.state.facets}
                groupComponent={this.props.groupComponent}
                lineComponentMapper={this.props.lineComponentMapper}
                isSelection={false}
                lineClickHandler={this._lineClickHandler}
                lineOperationList={this.props.lineOperationList}
                groupingKey={this.props.scopeFacetKey}
                initialRowsCount={this.props.groupMaxRows}
                action={this._action}
                scrollParentSelector={this.props.scrollParentSelector}
            />
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        return (
            <div className='search-panel' data-focus='quick-search'>
                {this._renderSearchBar()}
                {this._renderResults()}
            </div>
        );
    }
};

module.exports = builder(QuickSearchComponent);
