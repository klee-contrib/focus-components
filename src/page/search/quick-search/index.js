// Dependencies

const type = require('focus-core').component.types;
const builder = require('focus-core').component.builder;

// Components

const SearchBar = require('../../../search/search-bar').component;
const Results = require('../common/component/results').component;

// Mixins

const referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
const storeBehaviour = require('../../../common/mixin/store-behaviour');

// Actions

const actionBuilder = require('focus-core').search.actionBuilder;

// Stores

const quickSearchStore = require('focus-core').search.builtInStore.quickSearchStore;

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
    componentWillMount() {
        const {action, service, store} = this.props;
        this._action = action || actionBuilder({
            service: service,
            identifier: store.identifier,
            getSearchOptions: () => {return store.getValue.call(store); } // Binding the store in the function call
        });
        this._loadReference();
        store.addQueryChangeListener(this._triggerSearch);
        store.addScopeChangeListener(this._triggerSearch);
        store.addResultsChangeListener(this._onResultsChange);
    },
    /**
     * Unregister the store listeners
     */
    componentWillUnmount() {
        const {store} = this.props;
        store.removeQueryChangeListener(this._triggerSearch);
        store.removeScopeChangeListener(this._triggerSearch);
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
        const {store} = this.props;
        const resultsMap = store.getResults();
        const facets = store.getFacets();
        const totalCount = store.getTotalCount();
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
        const {store} = this.props;
        const {isLoading, reference: {scopes}} = this.state;
        return (
            <SearchBar
                action={this._action}
                data-focus='search-bar'
                loading={isLoading}
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
        const {groupComponent, groupMaxRows, lineComponentMapper, lineOperationList, scrollParentSelector, scopeFacetKey} = this.props;
        const {facets, resultsMap, totalCount} = this.state;
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
                scrollParentSelector={scrollParentSelector}
                totalCount={totalCount}
            />
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        const {style} = this.props;
        return (
            <div data-focus='quick-search'>
                <div>
                    {this._renderSearchBar()}
                </div>
                <div style={style.results}>
                    {this._renderResults()}
                </div>
            </div>
        );
    }
};

module.exports = builder(QuickSearchComponent);
